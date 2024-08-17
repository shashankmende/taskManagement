import React, { useEffect, useState } from 'react';
import './index.css'; // Make sure to add the styles for the table here
import DashBoardNav from '../DashboardNav';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';




const Dashboard = () => {
    const [tasksList, setTasksList] = useState([]);
    const  navigate = useNavigate()

    useEffect(() => {
        const getAllTasks = async () => {
            try {
                const url = 'http://localhost:3000/auth/tasks';
                const response = await axios.get(url);
                if (response.status === 200) {
                    setTasksList(response.data.tasks);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        getAllTasks();
    }, [tasksList]);

    const onClickDelteTaks = async(id)=>{
        try {
            const url = `http://localhost:3000/auth/task/delete/${id}`
            const response = await axios.delete(url)
            if( response.status ===200){
                alert("Task deleted successfully!")
            }

        } catch (error) {
            console.log("eroor")
        }
    }

    return (
        <div className='dashboard_bg_wrapper'>
            <DashBoardNav />
            <div className='dashboard_body'>
                <div className='header_wrapper'>
                    <h1 className='tasks_heading'>My Tasks</h1>
                    <div>
                        <select name="filter" id="" className='filter_wrapper'>
                            <option value="">Filter task by status</option>
                        <option value="TO_DO">To do</option>

                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="REVIEW">Review</option>
                            <option value="DONE">Done</option>
                        </select>
                        <button className='btn btn-success' onClick={()=>navigate('/addTask')}>+ Add Task</button>
                    </div>
                </div>
                <div className='table_wrapper'>
                    <table className='tasks_table'>
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
                            {tasksList.map(task => (
                                <tr key={task._id}>
                                    <td>{task.taskName}</td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td>{task.assignee}</td>
                                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                    <td>
                                        <>
                                        <CiEdit className='action_icons' size={20} style={{marginRight:'10px'}}/>
                                        <FaDeleteLeft  className='action_icons' size={20} onClick={()=> onClickDelteTaks(task._id)}/>
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
