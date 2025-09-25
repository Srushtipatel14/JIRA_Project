"use client";
import "../../css/cityadmin.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import { API_MEMBER_URL } from "../../utils/config";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { SingleValue } from "react-select";

interface TaskData {
    _id: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    duedate: string
}

interface TaskProps {
    role: string;
}

interface OptionType {
    value: string;
    label: string;
};

const Task: React.FC<TaskProps> = ({ role }) => {
    const [task, setTask] = useState<TaskData[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const getTaskdata = await axios.get(`${API_MEMBER_URL}/gettaskassigntomember`,
                    { withCredentials: true }
                );

                let taskDataVal = getTaskdata?.data?.data;
                setTask(taskDataVal);
            } catch (error: any) {
                return toast.error(error.response?.data?.message || "Something went wrong");
            }
        };

        fetchDetails();
    }, [role]);

    const handleSelection = async (selectedOption: SingleValue<OptionType>, field: keyof TaskData) => {
        try {
            const data = {
                status: selectedOption?.value,
                _id: field
            }
            const getTaskdata = await axios.patch(`${API_MEMBER_URL}/editassigntask`, data,
                { withCredentials: true }
            );
            if (getTaskdata.data.success) {
                setTask((prev) =>
                    prev.map((task: TaskData) =>
                        task._id === field
                            ? { ...task, status: selectedOption?.value || task.status }
                            : task
                    )
                );
                return toast.success(getTaskdata.data.message);
            }
        } catch (error: any) {
            return toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    const statusOptions = [
        { value: "Pending", label: "Pending" },
        { value: "In Progress", label: "In Progress" },
        { value: "Complete", label: "Complete" }
    ];

    return (
        <div className="container-fluid m-3 py-3 admin_div">
            <div className="admin_div_mainsec m-3">
                <div className="">Task Management</div>
            </div>
            <DataTable value={task} rows={10} tableStyle={{ minWidth: '50rem' }} sortOrder={-1}>
                <Column header="No." body={(_, options) => options.rowIndex + 1}></Column>
                <Column field="projectTitle" header="Project Name" sortable></Column>
                <Column field="title" header="Title" sortable></Column>
                <Column field="description" header="Description" sortable></Column>
                <Column field="priority" header="Priority" sortable></Column>
                <Column
                    field="status"
                    header="Status"
                    body={(rowData) => {
                        const selected = statusOptions.find(o => o.value === rowData.status);
                        return (
                            <Select
                                name="status"
                                options={statusOptions}
                                value={selected}
                                onChange={(selected) => handleSelection(selected, rowData._id)}
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
                        );
                    }}
                />
                <Column field="duedate" header="Due date" sortable body={(rowData) => rowData.duedate?.split("T")[0]} />
            </DataTable>
            <ToastContainer />
        </div>
    )
}

export default Task;