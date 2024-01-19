import React from 'react'
import Loading from '../../../components/loading/loading';
import { TbChefHat } from "react-icons/tb";

const DashboardCards = ({ data, isLoading }) => {
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
                                        <div className='flex justify-between items-center'>
                                            <span className='text-sm font-bold'>Rs. {d.price}</span>
                                            <span className='text-sm'>{new Date(d.createddate).toDateString()}</span>
                                        </div>
                                        <div className='flex justify-start items-center gap-2 mt-2'>
                                            <TbChefHat />
                                            <span className='text-sm font-bold italic'>{d.chef_name}</span>
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