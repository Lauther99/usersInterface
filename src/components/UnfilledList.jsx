import React from 'react';
import '../assets/styles/unfilledList.css';
import picture from '../assets/images/picture.svg';

const UnfilledList = () => {
    return (
        <div className='unfilled'>
            <img src={picture} alt="waiting"/>
            <h1>Parece que no encontramos usuarios, prueba creando uno nuevo :D</h1>
        </div>
    );
};

export default UnfilledList;