import React, { useEffect, useState } from 'react'
import Table from '../../../components/table/table'
import { useDispatch, useSelector } from 'react-redux';
import { getChefDishes } from '../../../redux/slices/dishes.slice';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../../redux/slices/cart.slice';

const ChefsDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const dishesData = useSelector((state) => state.dish.chefDishes);

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


    const addToCartItem = (item) => {
        dispatch(addToCart({
            item: { ...item, quantity: 1 }
        }))
    }

    const getDishesData = (id) => {
        setIsLoading(true);
        dispatch(
            getChefDishes({
                id
            })
        ).then(() => {
            setIsLoading(false);
        })
    }


    useEffect(() => {
        if (id) {
            getDishesData(id);
        }
    }, [id])
    useEffect(() => {
        if (dishesData && dishesData?.length) {
            setData(dishesData);
        }
    }, [dishesData])

    return (
        <div className='w-full mt-10'>
            <div className='w-full mt-8'>
                <Table
                    isloading={isLoading}
                    data={data}
                    headers={tableHeaders}
                />
            </div>
        </div>
    )
}

export default ChefsDetails