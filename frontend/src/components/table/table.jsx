import React from 'react';
import Loading from "../loading/loading";
import { Avatar } from '../avatar/avatar';

const Table = ({ headers, data, isloading }) => {

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 h-full">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {headers?.map((header) => (
                            <th scope="col" class="px-6 py-3 bg-pink-300">
                                {header.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                {isloading ? (
                    <Loading size="large" />
                ) : (<>
                    {data && data.length ? (
                        <tbody>
                            {data?.map((d) => (
                                <tr class="odd:bg-white even:bg-gray-50">
                                    {headers.map((header) => (
                                        <th scope="row" class="px-6 py-4">
                                            {header?.render ? (<> {header.render(d[header.key], d)} </>) : (
                                                <>
                                                    {header.type === 'text' && (<>{d[header.key]}</>)}
                                                    {header.type === 'date' && (<>{new Date(d[header.key]).toDateString()}</>)}
                                                    {header.type === 'image' && (<img src={d[header.key]} alt='Food Image' className="h-8 w-auto rounded" />)}
                                                </>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <div className='p-2'>
                            No Data Found ...
                        </div>
                    )}
                </>)}
            </table>
        </div>
    )
}

export default Table