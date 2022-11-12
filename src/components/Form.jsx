import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/styles/header.css'
import useModal from '../hooks/useModal'

const Form = ({ getData, selectedUser, unSelectUser }) => {
    const { handleSubmit, register, reset } = useForm()
    const [isOpen, openModal, closeModal] = useModal()

    const initialValues = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
    }

    useEffect(() => {
        if (selectedUser) {
            reset(selectedUser)
            openModal()
        } else {
            reset(initialValues)
            unSelectUser()
        }
    }, [selectedUser])

    const closeButtonFunction = () => {
        reset(initialValues)
        closeModal()
        unSelectUser()
    }

    const submit = (data) => {
        if (selectedUser) {
            axios.put(`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`, data)
                .then(() => {
                    getData(),
                    unSelectUser(),
                    closeModal()
                })
        } else {
            axios.post('https://users-crud1.herokuapp.com/users/', data)
                .then(() =>
                    getData(),
                    reset(initialValues),
                    closeModal())
                .catch(error => console.log(error.response))
        }
    }

    return (
        <div>
            <button className='btn create' onClick={openModal}>
                <i className="fa-solid fa-plus fa-xl"></i>
                Create new user
            </button>
            <form className='users-form' onSubmit={handleSubmit(submit)}>
                <div className={`modal-form ${isOpen ? 'modalOn' : null}`} >
                    <div className='create-container'>
                        <h1>{selectedUser? 'Edit user' : 'New user'}</h1>
                        <button type='button' className='btn close' onClick={closeButtonFunction}><i className="fa-solid fa-x fa-xs"></i></button>
                        <div className='feature'>
                            <label htmlFor="name">Name</label>
                            <input {...register('first_name')} type="text" id="name" />
                        </div>
                        <div className='feature'>
                            <label htmlFor="lastName">Last Name</label>
                            <input {...register('last_name')} type="text" id="lastName" />
                        </div>
                        <div className='feature'>
                            <label htmlFor="email">e-mail</label>
                            <input {...register('email')} type="email" id="email" />
                        </div>
                        <div className='feature'>
                            <label htmlFor="password">Password</label>
                            <input {...register('password')} type="password" id="password" />
                        </div>
                        <div className='feature'>
                            <label htmlFor="birthday">Birthday</label>
                            <input {...register('birthday')} type="date" id="birthday" />
                        </div>
                        <button className='btn add'>{selectedUser? 'Save changes' : 'Create a user'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;