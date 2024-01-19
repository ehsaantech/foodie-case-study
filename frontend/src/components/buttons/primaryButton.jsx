import React from 'react'

const PrimaryButton = ({ title, icon, fullWidth, onClick, ishidden }) => {
    return (
        <button onClick={onClick} className={`${ishidden ? 'hidden' : 'flex'} items-center justify-center gap-2 text-lg font-bold p-2.5 bg-pink-500 rounded border-pink-800 ${fullWidth ? 'w-full' : 'w-40'} text-white  hover:bg-pink-600`}>
            {icon && icon} {title}
        </button>
    )
}

export default PrimaryButton