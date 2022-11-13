import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/styles/header.css';
import '../assets/styles/buttonAnimation.css';
import useModal from '../hooks/useModal';
import anonymous from '../assets/images/proyect-reac-crud.png'

const Form = ({ getData, selectedUser, unSelectUser }) => {
    const { handleSubmit, register, reset } = useForm()
    const [isOpen, openModal, closeModal] = useModal()
    const [isError, setIsError] = useState(null)

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
        reset(initialValues);
        closeModal();
        unSelectUser();
        setIsError(null);
    }

    const submit = (data) => {
        if (selectedUser) {
            axios.put(`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`, data)
                .then(() => {
                    getData();
                    closeModal();
                    unSelectUser();
                    setIsError(null);
                })
                .catch(error => {
                    setIsError(error);
                })
        } else {
            axios.post('https://users-crud1.herokuapp.com/users/', data)
                .then(() => {
                    getData(),
                        reset(initialValues),
                        closeModal();
                    unSelectUser();
                    setIsError(null);
                }
                )
                .catch(error => {
                    setIsError(error)
                })
        }
    }

    function setModalState() {
        let state = ''
        if (isError) {
            state = 'modalOn'
        } else {
            isOpen ? state = 'modalOn' : null
        }
        return state
    }

    return (
        <div>
            <div className="container-btn-create">
                <img className="img-anonymous" src={anonymous} alt="" />
                <button className='btn create' onClick={openModal}>
                    <i className="fa-solid fa-plus fa-xl"></i>
                    CREATE A NEW USER
                </button>
            </div>
            <form className='users-form' onSubmit={handleSubmit(submit)}>
                <div className={`modal-form ${setModalState()}`} >
                    <div className='create-container'>
                        <h1>{selectedUser ? 'EDIT USER' : 'NEW USER'}</h1>
                        <button type='button' className='btn close' onClick={closeButtonFunction}>
                            <i className="fa-solid fa-x fa-xs"></i>
                        </button>
                        <div className='feature'>
                        {/* ---------- INICIO CODIGO INPUT - BY IMMER ---------- */}
                            <div className='input-elastic'>
                                <label for="name" class="inp">
                                    <input {...register('first_name')} type="text" id="name" placeholder="&nbsp;" />
                                    <span class="label">Name *</span>
                                    <svg width="120px" height="26px" viewBox="0 0 120 26">
                                        <path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
                                    </svg>
                                    <span class="border"></span>
                                </label>
                                <label for="lastName" class="inp">
                                    <input {...register('last_name')} type="text" id="lastName" placeholder="&nbsp;" />
                                    <span class="label">Last Name *</span>
                                    <svg width="120px" height="26px" viewBox="0 0 120 26">
                                        <path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
                                    </svg>
                                    <span class="border"></span>
                                </label>
                                <label for="email" class="inp">
                                    <input {...register('email')} type="email" id="email" placeholder="&nbsp;" />
                                    <span class="label">E-mail *</span>
                                    <svg width="120px" height="26px" viewBox="0 0 120 26">
                                        <path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
                                    </svg>
                                    <span class="border"></span>
                                </label>
                                <label for="password" class="inp">
                                    <input {...register('password')} type="password" id="password" placeholder="&nbsp;" />
                                    <span class="label">Password *</span>
                                    <svg width="120px" height="26px" viewBox="0 0 120 26">
                                        <path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
                                    </svg>
                                    <span class="border"></span>
                                </label>
                            </div>
                        {/* ---------- FIN CODIGO INPUT - BY IMMER ---------- */}
                        </div>
                        <div className='feature'>
                            <label htmlFor="birthday" className='label-birthady'>Birthday *</label>
                            <input {...register('birthday')} type="date" id="birthday" />
                        </div>
                        <div className='error-alert' style={isError ? { display: 'flex' } : null}>
                            <p>Debe llenar los campos con *</p>
                        </div>
                        <button className='btn add'>
                            {selectedUser ? 'SAVE CHANGES' : 'CREATE A USER'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;