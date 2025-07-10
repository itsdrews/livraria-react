import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
   <>
      <img src="/imgs/Logo.png" style={{
        width: "10rem",
        height: "10rem"
      }} alt=""/>
    <Link to='/'>
      <h1 className='logo'></h1>
   
   
    </Link>
   </>
   
   
  );
};

export default Logo;