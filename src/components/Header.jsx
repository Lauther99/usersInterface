import React, { useState } from 'react';
import '../assets/styles/header.css'
import Form from './Form';

const UsersForm = ({getData, selectedUser, unSelectUser}) => {
    
    return (
        <div className='form-container'>
            <h1>Users </h1>
            <Form getData={getData} selectedUser={selectedUser} unSelectUser={unSelectUser}/>
        </div>
    );
};

export default UsersForm;