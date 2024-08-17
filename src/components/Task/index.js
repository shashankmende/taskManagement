import React, { useEffect, useState } from 'react';
import './index.css';
import DashBoardNav from '../DashboardNav';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";

const Task = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [taskDetails, setTaskDetails] = useState({
        taskName: '',
        description: '',
        assignee: '',
        status: 'TO_DO',
        dueDate: ''
    });

    useEffect(() => {
        const getTaskDetails = async () => {
            try {
                const url = `http://localhost:3000/auth/task/${id}`;
                const response = await axios.get(url);
                console.log("response from task", response);
                if (response.status === 200) {
                    setTaskDetails(response.data.task);
                }
            } catch (error) {
                alert("Error", error.message);
            }
        };
        getTaskDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({
            ...taskDetails,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3000/auth/task/${id}`;
            const response = await axios.put(url, taskDetails);
            if (response.status === 200) {
                alert("Task updated successfully");
                navigate("/dashboard");
            }
        } catch (error) {
            alert("Error updating task", error.message);
        }
    };

    return (
        <div>
            <DashBoardNav />
            <div className='task_body_wrapper'>
                <div className='back_heading_wrapper'>
                    <FaArrowLeft size={25} style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")} />
                    <h3>Update Task</h3>
                </div>
                <form onSubmit={handleSubmit} className='update_body_form_wrapper'>
                    <input
                        type="text"
                        name="taskName"
                        className='task_input'
                        value={taskDetails.taskName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        className='task_input'
                        value={taskDetails.description}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="assignee"
                        className='task_input'
                        value={taskDetails.assignee}
                        onChange={handleInputChange}
                        required
                    />
                    <br />
                    <select
                        name="status"
                        className='select_list'
                        value={taskDetails.status}
                        onChange={handleInputChange}
                    >
                        <option value="TO_DO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="REVIEW">Review</option>
                        <option value="DONE">Done</option>
                    </select>
                    <input
                        type="date"
                        name='dueDate'
                        className='task_input'
                        value={taskDetails.dueDate}
                        onChange={handleInputChange}
                        required
                    />
                    <button type='submit' style={{marginTop:"20px"}} className='btn btn-success'>Update Task</button>
                </form>
            </div>
        </div>
    );
};

export default Task;
