import React from 'react'
import Table from '../../../components/table/table'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cart.slice';

const DashboardList = ({ data, isLoading }) => {

    const dispatch = useDispatch();

    const addToCartItem = (item) => {
        dispatch(addToCart({
            item: { ...item, quantity: 1 }
        }))
    }

    const tableHeaders = [
        {
            title: 'Image',
            key: 'image',
            type: 'image'
        },
        {
            title: 'Name',
            key: 'name',
            type: 'text'
        },
        {
            title: 'Price',
            key: 'price',
            type: 'text'
        },
        {
            title: 'Created By',
            key: 'chef_name',
            type: 'text'
        },
        {
            title: 'Created Date',
            key: 'createddate',
            type: 'date'
        },
        {
            title: 'Description',
            key: 'description',
            type: 'text'
        },
        {
            title: 'Action',
            key: '',
            type: 'text',
            render: (_, data) => (
                <>
                    <button className='bg-pink-500 text-white p-2 text-sm font-bold rounded hover:bg-pink-600' onClick={() => addToCartItem(data)}>Add to Cart</button>
                </>
            )
        }
    ]


    return (
        <div className='w-full overflow-scroll max-h-[750px]'>
            <Table
                isloading={isLoading}
                data={data}
                headers={tableHeaders}
            />
        </div>
    )
}

export default DashboardList