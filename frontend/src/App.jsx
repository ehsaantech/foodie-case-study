import React, { useEffect, useState } from 'react';
import './App.scss';
import { me } from "./redux/slices/auth.slice";
import PreLoader from "./components/preLoader/preLoader";
import Navigation from './navigation/navigation';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const userStatus = useSelector((state) => state.auth.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(me());
    } else {
      setIsLoading(false);
      const urlPrefix = location.pathname.split('/')[1];
      if (urlPrefix === 'food') {
        navigate('/login');
      }
    }
  }, []);

  useEffect(() => {
    if (userStatus === 'succeeded' || userStatus === 'failed') {
      setIsLoading(false);
    }
  })

  useEffect(() => {
    if (userStatus === 'succeeded') {
      if (!user) {
        const urlPrefix = location.pathname.split('/')[1];
        if (urlPrefix === 'food') {
          navigate('/login');
        } else {
          navigate(location.pathname);
        }
      } else {
        const urlPrefix = location.pathname.split('/')[1];
        if (urlPrefix !== 'food') {
          navigate('/food/home');
        } else {
          if (location.search) {
            navigate(`${location.pathname}${location.search}`);
          } else {
            navigate(location.pathname);
          }
        }
      }
    } else if (userStatus === 'failed') {
      navigate('/login');
    }
  }, [user]);

  return (<> {isLoading ? (<PreLoader />) : (<Navigation />)} </>);
}

export default App;
