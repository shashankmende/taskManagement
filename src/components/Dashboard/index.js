import React, { useEffect, useState } from "react";
import "./index.css";
import DashBoardNav from "../DashboardNav";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasksList, setTasksList] = useState([]);
  const [filter, setFilter] = useState(""); 
  const navigate = useNavigate();

  const getAllTasks = async (status = "") => {
    try {
        
        const url = status
            ? `http://localhost:3000/auth/task/filter?status=${status}`
            : "http://localhost:3000/auth/tasks";
        
        console.log('Fetching URL:', url);
        const response = await axios.get(url);
        
        console.log('Response Data:', response.data);
        if (response.status === 200) {
            setTasksList(response.data.tasks);
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};


  useEffect(() => {
    getAllTasks(filter);
}, [filter]);

const handleFilterChange = (e) => {
    setFilter(e.target.value);
};


  const onClickDeleteTask = async (id) => {
    try {
      
      const url = `http://localhost:3000/auth/task/delete/${id}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        alert("Task deleted successfully!");
        getAllTasks(filter); 
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div className="dashboard_bg_wrapper">
      <DashBoardNav />
      <div className="dashboard_body">
        <div className="header_wrapper">
          <h1 className="tasks_heading">My Tasks</h1>
          <div className="right_side_container">
            <div className="filter_wrapper">
              {/* <select
                name="filter"
                className="filter_wrapper"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="">Filter task by status</option>
                <option value="TO_DO">To do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Done</option>
              </select> */}
              
            </div>
            <button
              className="btn btn-success"
              onClick={() => navigate("/addTask")}
            >
              + Add Task
            </button>
          </div>
        </div>
        <div className="table_wrapper">
          <table className="tasks_table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasksList.map((task) => (
                <tr key={task._id}>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.assignee}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>
                    <>
                      <CiEdit
                        className="action_icons"
                        size={20}
                        style={{ marginRight: "10px" }}
                        onClick={()=>navigate(`/task/${task._id}`)}
                      />
                      <FaDeleteLeft
                        className="action_icons"
                        size={20}
                        onClick={() => onClickDeleteTask(task._id)}
                      />
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
