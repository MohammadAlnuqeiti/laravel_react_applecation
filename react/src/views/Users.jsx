// import React from 'react';
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
// import ReactPaginate from 'react-paginate';

const Users = () => {

    const [users , setUsers] = useState([])
    const [loading , setLoading] = useState(false)
    const {setNotification} = useStateContext()

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(()=>{
        getUsers()
    },[currentPage])

    const onDeleteClick = (u) => {
        if(!window.confirm("Are you sure you want delete this user?")){
            return
        }
        axiosClient.delete('/users/'+u.id)
        .then(()=>{
            setNotification("user was successfully deleted")
            getUsers();
        })
    }
    const getUsers = () => {
        setLoading(true)
        axiosClient.get(`/users?page=${currentPage}`)
        .then(({data})=>{
            setLoading(false)
            setPageCount(data.meta.last_page);
            setUsers(data.data)
        })
        .catch(()=>{
            setLoading(false)
        })
    }

// pagination 
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
        }
    };


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
                        <button className="btn-delete" onClick={ () => onDeleteClick(u)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                    </tbody>

                }
                                </table>

                {!loading ? (
                <div className="pagination">
                    <button
                        className="prev"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                    Previous
                    </button>
                {Array.from({ length: pageCount }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
                <button
                    className="next"
                    onClick={handleNextPage}
                    disabled={currentPage === pageCount}
                    >
                    Next
                </button>
            </div>
			) : (
				<div>Nothing to display</div>
			)}
            </div>
        </div>
    );
}

export default Users;

