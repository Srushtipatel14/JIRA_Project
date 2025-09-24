"use client";
import "../../css/cityadmin.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import { API_MEMBER_URL } from "../../utils/config";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useRouter } from 'next/navigation';

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

interface TaskProps {
    role: string;
}

interface OptionType {
    value: string;
    label: string;
};

const Task: React.FC<TaskProps> = ({role}) => {
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
                <Column field="status" header="Status" sortable></Column>
                <Column field="duedate" header="Due date" sortable body={(rowData) => rowData.duedate?.split("T")[0]} />
            </DataTable>
            <ToastContainer />
        </div>
    )
}

export default Task;