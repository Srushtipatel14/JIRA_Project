import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ADMIN_URL } from "../../utils/config";
import { toast, ToastContainer } from "react-toastify";

interface summaryData {
  projects: number;
  tasks: number;
  completeTasks: number;
  pendingTasks: number;
  overDueTasks: number;
  inProgressTasks: number;
  summary:string;
}

const Dashboard = () => {

  const [summary, setSummary] = useState<summaryData | null>(null);
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const { data } = await axios.get(`${API_ADMIN_URL}/insights`, { withCredentials: true });
        setSummary(data.data);
      } catch (err: any) {
        return toast.error(err.response?.data?.message || "Something went wrong");
      }
    };
    fetchInsights();
  }, []);

  if (summary===null) {
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
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          <div className="bg-white rounded-3 p-3 mb-3 shadow-sm">
            <div className="row g-3">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-primary-subtle text-primary shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Projects</h6>
                    <h4 className="card-text fw-bold fs-1">{summary?.projects}</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-info-subtle text-info shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Tasks</h6>
                    <h4 className="card-text fw-bold fs-1">{summary?.tasks}</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-success-subtle text-success shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Completed</h6>
                    <h4 className="card-text fw-bold fs-1">{summary?.completeTasks}</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-warning-subtle text-warning shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Pending</h6>
                    <h4 className="card-text fw-bold fs-1">{summary?.pendingTasks}</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card bg-danger-subtle text-danger shadow-sm rounded-3">
                  <div className="card-body text-center">
                    <h6 className="card-title">Overdue</h6>
                    <h4 className="card-text fw-bold fs-1">{summary?.overDueTasks}</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card" style={{ backgroundColor: '#fdb890ff', color: '#ee5c08ff' }}>
                  <div className="card-body text-center">
                    <h6 className="card-title">In Progress</h6>
                    <h4 className="card-text fw-bold fs-1">{summary?.inProgressTasks}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3 p-3 shadow-sm">
            <h5 className="mb-2">Left Side 2</h5>
            <p className="text-muted mb-0">{summary?.summary}</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-12 mt-3 mt-md-0">
          <div className="bg-white rounded-3 p-3 shadow-sm h-100">
            <h5 className="mb-2">Right Side</h5>
            <p className="text-muted mb-0">Sidebar or additional details go here.</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
