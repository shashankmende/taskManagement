import React, { useEffect, useState } from 'react';
import './index.css'; // Make sure to add the styles for the table here
import DashBoardNav from '../DashboardNav';
import axios from 'axios';

const Dashboard = () => {
    const [tasksList, setTasksList] = useState([]);

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
    }, []);

    return (
        <div>
            <DashBoardNav />
            <div className='dashboard_body'>
                <div className='header_wrapper'>
                    <h1 className='tasks_heading'>My Tasks</h1>
                    <button className='btn btn-success'>+ Add Task</button>
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
