import React from 'react'
import Loading from '../../../components/loading/loading';
import { TbChefHat } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cart.slice';

const DashboardCards = ({ data, isLoading }) => {

    const dispatch = useDispatch();

    const addToCartItem = (item) => {
        dispatch(addToCart({
            item: { ...item, quantity: 1 }
        }))
    }

    return (
        <div className=''>
            {isLoading ? (
                <div className='flex justify-between items-center'>
                    <Loading size="large" />
                </div>
            ) : (
                <>
                    {data && data.length ? (
                        <div className='flex items-center flex-wrap gap-4 justify-between'>
                            {data.map((d) => (
                                <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow">
                                    <img class="rounded-t-lg w-80 h-56" src={d.image} alt="" />
                                    <div class="p-5">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{d.name}</h5>
                                        <p class="mb-3 font-normal text-gray-700 ">{d.description}</p>
                                        <div className='flex justify-start items-center gap-2 mt-2'>
                                            <TbChefHat />
                                            <span className='text-sm font-bold italic'>{d.chef_name}</span>
                                        </div>
                                        <div className='flex justify-between items-center mt-4'>
                                            <span className='text-sm font-bold'>Rs. {d.price}</span>
                                            <button className='bg-pink-500 text-white p-2 text-sm font-bold rounded hover:bg-pink-600' onClick={() => addToCartItem(d)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            No Data Found ...
                        </div>
                    )}


                </>
            )}
        </div>
    )
}

export default DashboardCards