import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
   <>
    <Link to='/'>
      <h1 className='logo'></h1>
      <img src="/imgs/Logo.png" className='thumb' style={{
        width: "10rem",
        height: "10rem"
      }} alt=""/>
   
   
    </Link>
   </>
   
   
  );
};

export default Logo;