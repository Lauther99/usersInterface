import React from 'react';
import '../assets/styles/listUsers.css'

const Users = ({ data, selectUser, deleteUser}) => {
    return (
        <ul className='user-container'>
            {
                data.map(user => (
                    <li key={user.id} className='card'>
                        <div className='card-front'>
                            <h2>{`${user.first_name} ${user.last_name}`}</h2>
                            <h3>CORREO</h3>
                            <h4>{user.email}</h4>
                            <h3>CUMPLEAÑOS</h3>
                            <h4>{user.birthday}</h4>
                        </div>
                        <div className='card-back'>
                            <div className='trash' onClick={() => deleteUser(user.id)}>
                                <i className="fa-solid fa-trash fa-2xl"></i>
                            </div>
                            <div className='edit' onClick={() => selectUser(user)}>
                                <i className="fa-solid fa-pencil fa-2xl"></i>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

export default Users;