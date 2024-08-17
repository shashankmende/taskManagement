import React, { useState } from 'react'
import DashBoardNav from '../DashboardNav'
import './AddTask.css'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
    const navigate = useNavigate()
    const [taskDetails, setTaskDetails] = useState({
        taskName: "",
        description: "",
        status: "TO_DO", // Default value
        assignee: "",
        dueDate: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTaskDetails(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const onClickCreateTask = async (e) => {
        e.preventDefault(); // Prevent form from submitting the traditional way
        try {
            const url = 'http://localhost:3000/auth/task/'
            const response = await axios.post(url, taskDetails)
            console.log("response from add task", response)
            if (response.status === 201) {
                alert("Task added successfully")
                navigate("/dashboard"); // Redirect to dashboard after successful creation
            }
        } catch (error) {
            alert("Error adding task")
            console.error(error)
        }
    }

    return (
        <div className='addTask_wrapper'>
            <DashBoardNav />
            <div className='addTask_body'>
                <div className='back_heading_wrapper'>
                    <FaArrowLeft size={25} style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")} />
                    <h3>Create Task</h3>
                </div>
                <form className='addtask_form' onSubmit={onClickCreateTask}>
                    <input
                        type="text"
                        name='taskName'
                        placeholder='Enter task Name'
                        className='task_input'
                        value={taskDetails.taskName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name='description'
                        placeholder='Description'
                        className='task_input'
                        value={taskDetails.description}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name='assignee'
                        placeholder='Assignee'
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
                    <button type='submit' className='btn btn-success create_task_button'>
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTask
