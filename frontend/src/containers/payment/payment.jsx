import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/loading/loading';
import { addOrders } from '../../redux/slices/order.slice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cart.slice';
import { updatePageTitle } from '../../redux/slices/general.slice';

const PaymentComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart.cartItem);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const [isLoading, setIsLoading] = useState();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const payload = {
            user_id: user.id,
            user_name: user.username,
            items: cart,
            totalPrice: totalAmount,
            address: e.target.address.value,
            street: e.target.street.value,
            floor: e.target.floor.value,
            notes: e.target.notes.value,
            status: 'completed'
        }

        dispatch(addOrders({
            data: payload
        })).then(() => {
            setIsLoading(false);
            e.target.address.value = "";
            e.target.street.value = "";
            e.target.floor.value = "";
            e.target.notes.value = "";
            dispatch(clearCart());
            dispatch(updatePageTitle({
                title: 'Home'
            }))
            navigate('/food/home');
        })
    }

    const backToCart = () => {
        dispatch(updatePageTitle({
            title: 'My Cart'
        }))
        navigate('/food/cart');
    }

    return (
        <div className='w-full mt-5'>
            <div className='flex flex-col gap-2 shadow-md bg-white p-4'>
                <div className='flex justify-between font-extrabold text-3xl mb-5'>
                    <div className='font-extrabold text-3xl uppercase tracking-widest'>Review Items</div>
                    <span>
                        Total Payable: Rs. {totalAmount}
                    </span>
                </div>
                {cart?.map((c) => (
                    <div className='flex items-center gap-5'>
                        <div className='w-40'>
                            <img className="h-20 w-auto rounded" src={c.image} alt="Food Image" />
                        </div>
                        <span className='font-extrabold text-xl'>{c.quantity}</span>
                        <span className='font-extrabold text-xl'>{c.name}</span>
                        <span className='font-bold text-md'>Rs. {c.price}</span>
                    </div>
                ))}
            </div>
            <div className='mt-5 shadow-lg bg-white p-4'>
                <div className='font-extrabold text-3xl uppercase tracking-widest'>Delivery Address</div>
                <form onSubmit={handleOnSubmit}>
                    <div className='flex flex-col gap-1 mt-2'>
                        <label className='uppercase font-bold tracking-widest'>Address <span className='text-red-800'>*</span></label>
                        <input type="text" name='address' placeholder='Address *' required className='w-2/4 bg-gray-200/50 rounded p-2.5 outline-none' />
                    </div>
                    <div className='flex flex-col gap-1 mt-2'>
                        <label className='uppercase font-bold tracking-widest'>Street</label>
                        <input type="text" name='street' placeholder='Street' className='w-2/4 bg-gray-200/50 rounded p-2.5 outline-none' />
                    </div>
                    <div className='flex flex-col gap-1 mt-2'>
                        <label className='uppercase font-bold tracking-widest'>Floor </label>
                        <input type="text" name='floor' placeholder='floor' className='w-2/4 bg-gray-200/50 rounded p-2.5 outline-none' />
                    </div>
                    <div className='flex flex-col gap-1 mt-2'>
                        <label className='uppercase font-bold tracking-widest'>Additional Info</label>
                        <input type="text" name='notes' placeholder='Additional Info' className='w-2/4 bg-gray-200/50 rounded p-2.5 outline-none' />
                    </div>


                    <div className='flex justify-end items-center gap-2 mt-10'>
                        <button type='button' className='p-2.5 rounded font-semibold hover:bg-gray-400 hover:text-white disabled:cursor-not-allowed' disabled={isLoading} onClick={backToCart}>Back</button>
                        <button type='submit' className='bg-pink-500 text-white p-2.5 rounded font-semibold hover:bg-pink-600 flex items-center gap-1 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed' disabled={isLoading}>
                            {isLoading && <Loading />} Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PaymentComponent