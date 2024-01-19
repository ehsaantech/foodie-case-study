import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/table/table';
import { MdDelete } from "react-icons/md";
import { calculateTotal, deleteFromCart, updateInCart } from '../../redux/slices/cart.slice';
import PrimaryButton from '../../components/buttons/primaryButton';
import { useNavigate } from 'react-router-dom';


const CartComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartItem);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const deleteItemFromCart = (id) => {
    dispatch(deleteFromCart({
      id
    }))
    getTotalAmount();
  }

  const updateCartItem = (id, obj) => {
    dispatch(updateInCart({
      id,
      obj
    }))
  }

  const handleUpdate = (data, op) => {
    let payload = JSON.parse(JSON.stringify(data));
    if (op === 'inc') {
      payload.quantity = data.quantity + 1;
    } else {
      if (data.quantity - 1 >= 1) {
        payload.quantity = data.quantity - 1;
      }
    }
    updateCartItem(data.id, payload);
    getTotalAmount();
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
      type: 'text',
      render: (_, data) => {
        return (
          <div className='flex items-center gap-3'>
            Rs. {data.price}
          </div>
        )
      }
    },
    {
      title: 'Quantity',
      key: 'quantity',
      type: 'text',
      render: (_, data) => {
        return (
          <div className='flex items-center gap-3'>
            <button className='bg-gray-200 rounded h-8 w-8 text-md font-bold hover:bg-gray-300' onClick={() => handleUpdate(data, 'inc')}>+</button>
            <span>{data.quantity}</span>
            <button className='bg-gray-200 rounded h-8 w-8 text-md font-bold hover:bg-gray-300' onClick={() => handleUpdate(data, 'dec')}>-</button>
          </div>
        )
      }
    },
    {
      title: 'Action',
      key: '',
      type: 'text',
      render: (_, data) => {
        return (
          <div className='flex items-center gap-3'>
            <MdDelete size={24} className='text-red-600 cursor-pointer' onClick={() => deleteItemFromCart(data.id)} />
          </div>
        )
      }
    },

  ]

  const getTotalAmount = () => {
    dispatch(calculateTotal())
  }

  useEffect(() => {
    getTotalAmount()
  }, [])

  return (
    <div className='w-full mt-10'>
      <Table
        isloading={false}
        data={cart}
        headers={tableHeaders}
      />

      <div className='flex items-center justify-end gap-4 mt-5'>

        <div className='italic font-extrabold tracking-widest text-lg'>
          Total Amount: {totalAmount ? `Rs.${totalAmount}` : totalAmount}
        </div>

        <PrimaryButton
          title="Proceed to Payment"
          onClick={() => navigate('/food/payment')}
        />
      </div>

    </div>
  )
}

export default CartComponent