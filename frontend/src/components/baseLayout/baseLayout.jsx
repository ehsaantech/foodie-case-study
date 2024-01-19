import React, { useState } from 'react'
import { logout } from '../../redux/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import PrimaryButton from '../buttons/primaryButton';
import { FaPowerOff, FaHome } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { MdOutlineFoodBank, MdOutlineFastfood } from "react-icons/md";


import Logo from "../../assets/foodpanda.svg";
import Avatar from '../avatar/avatar';

const BaseLayout = () => {

  const [pageTitle, setPageTitle] = useState('home');
  const user = useSelector((state) => state.auth.user);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const menus = [
    {
      title: 'Home',
      icon: <MdOutlineFoodBank />,
      route: '/food/home',
      pageTitle: 'home',
      role: 'both'
    },
    {
      title: 'My Order',
      icon: <MdOutlineFastfood />,
      route: '/food/my-order',
      pageTitle: 'my orders',
      role: 'both'
    },
    {
      title: 'My Dishes',
      icon: <ImSpoonKnife />,
      route: '/food/dishes',
      pageTitle: 'my dishes',
      role: 'chef'
    }
  ]


  const logoutHandler = () => {
    dispatch(logout())
    dispatch({ type: 'session/end' })
    navigation('/login')
  }

  const navigateTo = (location) => navigation(location);

  return (
    <div className='w-full h-screen bg-gray-50 flex'>
      {/* Side Drawer */}
      <div className={`w-72 h-full bg-[#d80d6a] shadow-2xl shadow-pink-700/50 p-4 flex flex-col justify-between`}>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col justify-center items-center mt-3'>
            <img className="mx-auto h-10 w-auto" src={Logo} alt="Logo Image" />
            <span className='text-white text-lg font-extrabold uppercase tracking-widest'>Foodies App</span>
          </div>
          <div className='flex flex-col gap-5 mt-5'>
            {menus.map((menu) => (
              <PrimaryButton
                fullWidth={true}
                title={menu.title}
                icon={menu.icon}
                ishidden={menu.role === 'chef' && user.role !== 'chef'}
                onClick={() => {
                  navigateTo(menu.route);
                  setPageTitle(menu.pageTitle)
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <PrimaryButton
            fullWidth={true}
            title="Logout"
            icon={<FaPowerOff />}
            onClick={logoutHandler}
          />
        </div>
      </div>
      {/* web content */}
      <div className='px-10 py-10 w-full max-h-screen overflow-auto'>
        <div className='w-full flex justify-between items-center'>
          <div className='text-4xl tracking-widest uppercase font-extrabold'>
            {pageTitle}
          </div>
          <Avatar firstname={user.firstname} lastname={user.lastname} />
        </div>
        <div className='w-full mt-2 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default BaseLayout