"use client";
import "@/styles/layoutdesign.css";
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
import BackButton from "@/utils/backbutton";

interface ProjectData {
    _id: string,
    title: string,
    description: string,
}

interface memberData {
    _id: string;
    userName: string;
    email: string;
    role: string;
}

interface ProjectDataObj {
    _id?: string;
    title?: string;
    description?: string;
    collaborators?: collaborators[];
}

interface collaborators {
    userId?: string,
};

interface FacilityOption {
    value: string;
    label: string;
}

interface errMsg {
    title?: string;
    description?: string;
}

const Project = () => {
    const [project, setProject] = useState<ProjectData[]>([]);
    const [collaborator, setCollaborator] = useState<collaborators>({ userId: '' })
    const [memberData, setMemberData] = useState<memberData[]>([])
    const [projectAddFormShow, setProjectAddFormShow] = useState<boolean>(false);
    const [projectDataObj, setProjectDataObj] = useState<ProjectDataObj>({});
    const [selectedCollab, setSelectedCollab] = useState<FacilityOption | null>(null);
    const router = useRouter();
    const [errMsg, setErrMsg] = useState<errMsg>({});

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const getprojectdata = await axios.get(`${API_ADMIN_URL}/getallproject`, {
                    withCredentials: true
                });
                setProject(getprojectdata?.data?.data);
                setMemberData(getprojectdata?.data?.data.collaborators)
            } catch (error: any) {
                return toast.error(error.response.data.message);
            }
        }
        fetchDetails()
    }, []);

    const validateField = (name: string, value: string) => {
        let errors = { ...errMsg };
        switch (name) {
            case "title":
            case "description":
                delete errors[name];
                break;
            default:
                break;
        }
        setErrMsg(errors);
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        const fields: (keyof ProjectDataObj)[] = ["title", "description"];
        fields.forEach((field) => {
            const value = projectDataObj[field];
            if (!value || (typeof value === "string" && value.trim() === "")) {
                errors[field] = "*";
            }
        });
        setErrMsg(errors);
        return Object.keys(errors).length === 0;
    };

    const submitForm = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            if (projectDataObj?._id) {
                const editProjectRes = await axios.put(`${API_ADMIN_URL}/updateproject`, projectDataObj, {
                    withCredentials: true
                });
                const data = editProjectRes?.data?.data;
                setProject((prevProject) =>
                    prevProject.map((item) =>
                        item._id === projectDataObj._id ? { ...item, ...data } : item
                    )
                );
                setProjectAddFormShow(false)
                setProjectDataObj({})
                setErrMsg({})
                return toast.success("Project update successfully");
            }
            else {
                const createProjectRes = await axios.post(`${API_ADMIN_URL}/createproject`, projectDataObj, {
                    withCredentials: true
                });
                const data = createProjectRes?.data?.data;
                setProject((prevProject) => [...prevProject, data]);
                setProjectAddFormShow(false)
                setProjectDataObj({})
                setErrMsg({})
                return toast.success("Project add successfully");
            }
        } catch (error: any) {
            return toast.error(error.response.data.message);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProjectDataObj((prev) => ({
            ...(prev || {}),
            [name]: value
        }))
        validateField(name,value)
    }

    const memberOptions = (memberData || []).map((item) => ({
        value: item._id,
        label: item.email,
        isDisabled: !!projectDataObj?.collaborators?.some(f => f.userId === item._id)
    }));

    const collaboratorsWithDetails = (projectDataObj?.collaborators || []).map(c => {
        const member = memberData.find(m => m._id === c.userId);
        return {
            ...c,
            userName: member?.userName,
            email: member?.email
        };
    });

    const OpenProjectAddModal = async () => {
        try {
            const resMemberData = await axios.get(`${API_ADMIN_URL}/getalluser`, {
                withCredentials: true
            })
            if (resMemberData.data.success) {
                setProjectAddFormShow(true)
                setMemberData(resMemberData.data.data)
            }
            else {
                return toast.error(resMemberData.data.message);
            }

        } catch (error: any) {
            return toast.error(error.response.data.message);
        }
    }

    return (
        <div className="container-fluid my-3 py-3 admin_div">
            <div className="admin_div_mainsec m-3">
                <div>Project Management</div>
                <div className="d-flex gap-1">
                    <button className="admin_city_add" onClick={OpenProjectAddModal}>Add Project</button>
                    <BackButton />
                </div>
            </div>
            <DataTable value={project} rows={10} tableStyle={{ minWidth: '50rem' }} sortOrder={-1}>
                <Column header="No." body={(_, options) => options.rowIndex + 1}></Column>
                <Column field="title" header="Title" sortable></Column>
                <Column field="description" header="Description" sortable></Column>
                <Column header="Add Task" body={(rawData) => (
                    <div>
                        <button className="screen_add" onClick={() => {
                            router.push(`/project/${rawData._id}`)
                        }}>Add</button>
                    </div>
                )}></Column>
                <Column header="Edit" body={(rowData) => (
                    <FaEdit onClick={async () => {
                        OpenProjectAddModal();
                        setProjectAddFormShow(true);
                        try {
                            const editModeRes = await axios.get(`${API_ADMIN_URL}/getsingleproject/${rowData._id}`,
                                { withCredentials: true }
                            );
                            let projectData = editModeRes?.data?.data;
                            if (projectData?.collaborators?.length) {
                                projectData = {
                                    ...projectData,
                                    collaborators: projectData.collaborators.map((c: any) => ({
                                        userId: c.userId._id ? c.userId._id : c.userId
                                    }))
                                };
                            }
                            setProjectDataObj(projectData);
                        } catch (error) {
                        }
                    }}
                    />
                )} ></Column>
            </DataTable>
            <Modal
                show={projectAddFormShow}
                onHide={() => {
                    setProjectAddFormShow(false);
                    setProjectDataObj({});
                    setErrMsg({})
                }}
                contentClassName="admin_form"
                centered
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 admin_form_heading">Add Project</h5>
                    <CgClose size={24} onClick={() => {
                        setProjectAddFormShow(false);
                        setProjectDataObj({});
                        setErrMsg({})
                    }} style={{ cursor: "pointer" }} />
                </Modal.Header>

                <Modal.Body>
                    <div className="admin_form_line w-100 mb-3"></div>
                    <form>
                        <div className="row align-items-stretch pb-2">
                            <div className="col-md-5 d-flex flex-column">
                                <div className="mb-3">
                                    <label className="form-label admin_form_label">Project Name<span style={{ color: "red" }}>{errMsg.title}</span></label>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        value={projectDataObj?.title || ''}
                                        className="form-control"
                                        placeholder="Enter project name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label admin_form_label">Collaborators</label>
                                    <div className="d-flex gap-2">
                                        <div className="flex-grow-1">
                                            <Select
                                                name="role"
                                                options={memberOptions}
                                                value={selectedCollab}
                                                onChange={(selectedOption: SingleValue<FacilityOption>) => {
                                                    setSelectedCollab(selectedOption);
                                                    setCollaborator({
                                                        userId: selectedOption?.value ?? '',
                                                    });
                                                }}
                                                placeholder="-- Select  collaborator --"
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
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    if (!collaborator.userId?.trim()) {
                                                        toast.warn('Please select a facility before adding.');
                                                        return;
                                                    }
                                                    setProjectDataObj((prev) => ({
                                                        ...prev,
                                                        collaborators: [...(prev.collaborators || []), collaborator],
                                                    }));
                                                    setCollaborator({
                                                        userId: '',
                                                    });
                                                    setSelectedCollab(null);
                                                }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 d-flex flex-column">
                                <label className="form-label admin_form_label">Description <span style={{ color: "red" }}>{errMsg.description}</span></label>
                                <textarea
                                    name="description"
                                    onChange={handleChange}
                                    value={projectDataObj?.description || ''}
                                    className="form-control flex-grow-1"
                                    style={{ resize: 'none' }}
                                />
                            </div>
                        </div>

                        <DataTable value={collaboratorsWithDetails}>
                            <Column header="No." body={(_, options) => options.rowIndex + 1}></Column>
                            <Column field="userName" header="Username"></Column>
                            <Column field="email" header="Email"></Column>
                        </DataTable>

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
export default Project;