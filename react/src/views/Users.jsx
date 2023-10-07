// import React from 'react';
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

const Users = () => {

    const [users , setUsers] = useState([])
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
        getUsers()
    },[])

    const onDeleteClick = (u) => {
        if(!window.confirm("Are you sure you want delete this user?")){
            return
        }
        axiosClient.delete('/users/'+u.id)
        .then((res)=>{
            console.log(res);
            getUsers();
        })
    }
    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
        .then(({data})=>{
            setLoading(false)
            setUsers(data.data)
        })
        .catch(()=>{
            setLoading(false)
        })
    }



    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Create Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                {loading &&
                    <tbody>
                    <tr>
                    <td colSpan="5" className="text-center">
                        Loading...
                    </td>
                        </tr>
                    </tbody>
                }
                {!loading &&
                    <tbody>
                    {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.created_at}</td>
                        <td>
                        <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                        &nbsp;
                        <button className="btn-delete" onClick={ u => onDeleteClick(u)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                }
                </table>
            </div>
        </div>
    );
}

export default Users;

