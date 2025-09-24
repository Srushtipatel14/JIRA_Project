'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import Project from "./project/project";
import Task from "./task/task";
import TaskMember from "./memberTask/task";
import Cookies from "js-cookie";

const Homescreen = () => {
    const params = useParams();
    let id = params?.id;
    if (Array.isArray(id)) {
        id = id[0];
    }

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const loggedUser = Cookies.get("logged_user");
            if (loggedUser) {
                setUser(JSON.parse(loggedUser));
            }
        }
    }, []);

    if (!user) {
        // Full-page loader
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f8f9fa",
                    flexDirection: "column",
                }}
            >
                <div className="spinner-border text-primary" role="status" style={{ width: '2rem', height: '2rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading...</p>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <Navbar />
            <div className="flex-grow-1 px-3">
                {user.role === 'member' ? (
                    <TaskMember role={user.role} />
                ) : (
                    id ? <Task id={id} /> : <Project />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Homescreen;
