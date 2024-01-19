import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDishes } from '../../redux/slices/dishes.slice'
import Loading from '../../components/loading/loading';
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import DashboardCards from './cards/dashboardCards';
import DashboardList from './list/dashboardList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const dishData = useSelector((state) => state.dish.dishes);
  const [data, setData] = useState(true);
  const [isCards, setIsCards] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getAllDishesList = () => {
    setIsLoading(true);
    dispatch(getAllDishes()).then(() => {
      setIsLoading(false);
    })
  }


  const handleSearch = (text) => {
    if (dishData && dishData.length) {
      if (text.length >= 3) {
        const filter = dishData.filter((e) => String(e.name).toLowerCase().includes(String(text).toLowerCase()));
        setData(filter);
      } else {
        setData(dishData);
      }
    }
  }

  useEffect(() => {
    if (!dishData && !dishData?.length) {
      getAllDishesList();
    }
  }, [])
  useEffect(() => {
    if (dishData && dishData.length) {
      setData(dishData);
    }
  }, [dishData])

  return (
    <div className='w-full mt-5'>
      {
        isLoading ? (
          <div className='flex flex-1 justify-center items-center'>
            <Loading size='large' />
          </div>
        ) : (
          <div className='w-full'>
            <div className='w-full flex justify-between items-center'>
              <input type="text" className='bg-pink-100 rounded p-2.5 text-md outline-none w-80 text-gray-600 border-2 border-transparent focus:border-pink-600' placeholder='Search...' onInput={(e) => handleSearch(e.target.value)} />
              <div className='flex items-center gap-2'>
                <FaList size={32} className={`cursor-pointer p-1.5 rounded ${!isCards ? 'bg-pink-500 text-white' : 'hover:bg-pink-200/50'}`} onClick={() => setIsCards(false)} />
                <MdGridView size={32} className={`cursor-pointer p-1.5 rounded ${isCards ? 'bg-pink-500 text-white' : 'hover:bg-pink-200/50'}`} onClick={() => setIsCards(true)} />
              </div>
            </div>

            <div className='w-full mt-5'>
              {isCards ? (
                <DashboardCards data={data} isLoading={isLoading} />
              ) : (
                <DashboardList data={data} isLoading={isLoading} />
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Dashboard