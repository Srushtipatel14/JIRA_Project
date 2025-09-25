"use client";
import "../../css/cityadmin.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import { API_ADMIN_URL } from "../../utils/config";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import Select from 'react-select';
import { SingleValue } from "react-select";
import { useRouter } from 'next/navigation';
import BackButton from "@/app/utils/backbutton";

interface TaskData {
    _id: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    duedate: string
}

interface memberData {
    userId: {
        _id: string;
        userName: string;
        email: string;
        role: string;
    }
}

interface TaskDataObj {
    _id?: string;
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    assignId?: string;
    duedate?: string;
    projectId?: string;
}

interface errMsg {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    assignId?: string;
    duedate?: string;
}

interface TaskProps {
    id: string;
}

interface OptionType {
    value: string;
    label: string;
};

const Task: React.FC<TaskProps> = ({ id }) => {
    const [task, setTask] = useState<TaskData[]>([]);
    const [memberData, setMemberData] = useState<memberData[]>([])
    const [taskAddFormShow, setTaskAddFormShow] = useState<boolean>(false);
    const [taskDataObj, setTaskDataObj] = useState<TaskDataObj>({});
    const [errMsg, setErrMsg] = useState<errMsg>({});

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const getTaskdata = await axios.get(`${API_ADMIN_URL}/getalltaskbyproject/${id}`,
                    { withCredentials: true }
                );

                let taskDataVal = getTaskdata?.data?.data;
                setTask(taskDataVal);
            } catch (error: any) {
                return toast.error(error.response?.data?.message || "Something went wrong");
            }
        };

        fetchDetails();
    }, [id]);

    const submitForm = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            taskDataObj.projectId = id;
            if (taskDataObj?._id) {
                const editProjectRes = await axios.put(`${API_ADMIN_URL}/updatetask`, taskDataObj, {
                    withCredentials: true
                });
                const data = editProjectRes?.data?.data;
                setTask((prevProject) =>
                    prevProject.map((item) =>
                        item._id === taskDataObj._id ? { ...item, ...data } : item
                    )
                );
                setTaskAddFormShow(false)
                setErrMsg({})
                setTaskDataObj({})
                return toast.success("Project update successfully");
            }
            else {
                const createProjectRes = await axios.post(`${API_ADMIN_URL}/createtask`, taskDataObj, {
                    withCredentials: true
                });
                const data = createProjectRes?.data?.data;
                setTask((prevProject) => [...prevProject, data]);
                setTaskAddFormShow(false)
                setTaskDataObj({})
                setErrMsg({})
                return toast.success("Project add successfully");
            }
        } catch (error: any) {
            return toast.error(error.response.data.message);
        }
    }

    const validateField = (name: string) => {
        let errors = { ...errMsg };
        switch (name) {
            case "title":
            case "description":
            case "status":
            case "priority":
            case "assignId":
            case "duedate":
                delete errors[name];
                break;
            default:
                break;
        }
        setErrMsg(errors);
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        const fields: (keyof TaskDataObj)[] = ["title", "description", "status", "priority", "assignId", "duedate"];
        fields.forEach((field) => {
            const value = taskDataObj[field];
            if (!value || (typeof value === "string" && value.trim() === "")) {
                errors[field] = "*";
            }
        });
        setErrMsg(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setTaskDataObj((prev) => ({
            ...(prev || {}),
            [name]: value
        }))
        validateField(name)
    }

    const handleSelection = (selectedOption: SingleValue<OptionType>, field: keyof TaskDataObj) => {
        setTaskDataObj(prev => ({
            ...prev,
            [field]: selectedOption?.value || ""
        }));
        validateField(field)
    };

    const memberOptions = (memberData || []).map((item) => ({
        value: item.userId._id,
        label: item.userId.email
    }));

    const OpenProjectAddModal = async () => {
        try {
            const resMemberData = await axios.get(`${API_ADMIN_URL}/getsingleproject/${id}`, {
                withCredentials: true
            })
            if (resMemberData.data.success) {
                setTaskAddFormShow(true)
                setMemberData(resMemberData?.data?.data?.collaborators)
            }
            else {
                return toast.error(resMemberData.data.message);
            }

        } catch (error: any) {
            return toast.error(error.response.data.message);
        }
    }

    const priorityOptions = [
        { value: "High", label: "High" },
        { value: "Medium", label: "Medium" },
        { value: "Low", label: "Low" }
    ];

    const statusOptions = [
        { value: "Pending", label: "Pending" },
        { value: "In Progress", label: "In Progress" },
        { value: "Complete", label: "Complete" }
    ];

    return (
        <div className="container-fluid m-3 py-3 admin_div">
            <div className="admin_div_mainsec m-3">

                <div className="">Task Management</div>

                <div className="d-flex gap-1">
                    <button className="admin_city_add" onClick={OpenProjectAddModal}>Add Task <i className="fa fa-tasks" aria-hidden="true"></i></button>
                    <BackButton />
                </div>
            </div>
            <DataTable value={task} rows={10} tableStyle={{ minWidth: '50rem' }} sortOrder={-1}>
                <Column header="No." body={(_, options) => options.rowIndex + 1}></Column>
                <Column field="title" header="Title" sortable></Column>
                <Column field="description" header="Description" sortable></Column>
                <Column field="priority" header="Priority" sortable></Column>
                <Column field="status" header="Status" sortable></Column>
                <Column field="duedate" header="Due date" sortable body={(rowData) => rowData.duedate?.split("T")[0]} />
                <Column header="Edit" body={(rowData) => (
                    <FaEdit onClick={async () => {
                        OpenProjectAddModal();
                        setTaskAddFormShow(true);
                        const editModeRes = await axios.get(`${API_ADMIN_URL}/getsingletask/${rowData._id}`, {
                            withCredentials: true
                        });
                        setTaskDataObj(editModeRes.data.data)
                    }} />
                )} ></Column>
            </DataTable>
            <Modal
                show={taskAddFormShow}
                onHide={() => {
                    setTaskAddFormShow(false);
                    setTaskDataObj({});
                    setErrMsg({})
                }}
                contentClassName="admin_form"
                centered
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 admin_form_heading">Add Task</h5>
                    <CgClose size={24} onClick={() => {
                        setTaskAddFormShow(false);
                        setTaskDataObj({});
                        setErrMsg({})
                    }} style={{ cursor: "pointer" }} />
                </Modal.Header>

                <Modal.Body>
                    <div className="admin_form_line w-100 mb-3"></div>
                    <form>
                        <div className="row align-items-stretch pb-2">
                            <div className="col-md-5 d-flex flex-column">
                                <div className="mb-3">
                                    <label className="form-label admin_form_label">Task Name<span style={{ color: "red" }}>{errMsg.title}</span></label>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        value={taskDataObj?.title || ''}
                                        className="form-control"
                                        placeholder="Enter task name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label admin_form_label">Assign to<span style={{ color: "red" }}>{errMsg.assignId}</span></label>
                                    <div className="d-flex gap-2">
                                        <div className="flex-grow-1">
                                            <Select
                                                name="assignId"
                                                options={memberOptions}
                                                value={memberOptions.find(o => o.value === taskDataObj.assignId) || null}
                                                onChange={(selected) => handleSelection(selected, "assignId")}
                                                placeholder="-- Select  assignee --"
                                                styles={{
                                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                    option: (provided, state) => ({
                                                        ...provided,
                                                        color: state.isDisabled ? '#999' : 'black',
                                                        backgroundColor: state.isDisabled
                                                            ? '#f9f9f9'
                                                            : state.isFocused
                                                                ? '#f0f0f0'
                                                                : 'white',
                                                        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 d-flex flex-column">
                                <label className="form-label admin_form_label">Description <span style={{ color: "red" }}>{errMsg.description}</span></label>
                                <textarea
                                    name="description"
                                    onChange={handleChange}
                                    value={taskDataObj?.description || ''}
                                    className="form-control flex-grow-1"
                                    style={{ resize: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="form-label admin_form_label">Status<span style={{ color: "red" }}>{errMsg.status}</span></label>
                                <div className="d-flex gap-2">
                                    <div className="flex-grow-1">
                                        <Select
                                            name="status"
                                            options={statusOptions}
                                            value={statusOptions.find(o => o.value === taskDataObj.status) || null}
                                            onChange={(selected) => handleSelection(selected, "status")}
                                            placeholder="-- Select status --"
                                            styles={{
                                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                option: (provided, state) => ({
                                                    ...provided,
                                                    color: state.isDisabled ? '#999' : 'black',
                                                    backgroundColor: state.isDisabled
                                                        ? '#f9f9f9'
                                                        : state.isFocused
                                                            ? '#f0f0f0'
                                                            : 'white',
                                                    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="form-label admin_form_label">Priority<span style={{ color: "red" }}>{errMsg.priority}</span></label>
                                <div className="d-flex gap-2">
                                    <div className="flex-grow-1">
                                        <Select
                                            name="priority"
                                            options={priorityOptions}
                                            value={priorityOptions.find(o => o.value === taskDataObj.priority) || null}
                                            onChange={(selected) => handleSelection(selected, "priority")}
                                            placeholder="-- Select priority --"
                                            styles={{
                                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                option: (provided, state) => ({
                                                    ...provided,
                                                    color: state.isDisabled ? '#999' : 'black',
                                                    backgroundColor: state.isDisabled
                                                        ? '#f9f9f9'
                                                        : state.isFocused
                                                            ? '#f0f0f0'
                                                            : 'white',
                                                    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label admin_form_label" >Due Date<span style={{ color: "red" }}>{errMsg.duedate}</span></label>
                                <input type="date" name="duedate" onChange={handleChange} value={
                                    taskDataObj?.duedate
                                        ? new Date(taskDataObj.duedate).toISOString().split("T")[0]
                                        : ""
                                } className="form-control" />
                            </div>
                        </div>
                        <div className="text-end mt-4">
                            <button type="button" className="admin_form_btn px-4 py-2" onClick={submitForm}>
                                Submit
                            </button>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default Task;