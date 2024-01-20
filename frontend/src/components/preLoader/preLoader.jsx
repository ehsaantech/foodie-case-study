import React from 'react';
import "./preLoader.scss";

const PreLoader = () => {
  return (
    <div className='w-full h-[100vh] flex bg-gradient-to-bl justify-center items-center from-fuchsia-600 to-pink-600 overflow-x-hidden overflow-y-hidden z-[9999px]'>
      <div className="loader">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="ball"></div>
      </div>
    </div>
  )
}

export default PreLoader