import React from 'react';
import * as randomColor from 'random-color';

const Avatar = ({ src, firstname, lastname, size = 'small' }) => {
    const getColor = () => {
        const color = ['red', 'green', 'blue'];
        const lum = ['light', 'dark'];
        const params = {
            luminosity: lum[Math.floor(Math.random() * 2)],
            hue: color[Math.floor(Math.random() * 3)]
        }
        return randomColor(params).hexString();
    }
    const getFirstName = () => {
        const split = firstname.split(' ');
        return split[split.length - 1]
    }
    return (
        <div className='flex items-center gap-2 hover:bg-slate-200 rounded p-1 px-2'>
            <div className='text-md font-semibold uppercase text-slate-600 tracking-widest'>{getFirstName()} {lastname}</div>
            <div>
                {firstname && lastname && !src ? (
                    <div className={`${size === 'large' ? 'h-20 w-20' : size === 'medium' ? 'h-16 w-16' : 'h-10 w-10'} rounded-full flex justify-center items-center font-bold text-white`} style={{ background: getColor() }}>
                        {firstname[0]}{lastname[0]}
                    </div>
                ) : (
                    <img className={`mx-auto ${size === 'large' ? 'h-20 w-20' : size === 'medium' ? 'h-16 w-16' : 'h-10 w-10'}  rounded-full border-2 border-slate-400`} src={src} alt="User Image" />
                )}
            </div>
        </div>
    )
}

export default Avatar