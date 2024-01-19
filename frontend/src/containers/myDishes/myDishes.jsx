import React, { useEffect, useState } from 'react';
import PrimaryButton from "../../components/buttons/primaryButton";
import { IoMdAdd } from "react-icons/io";
import Table from '../../components/table/table';
import { Modal } from "antd"
import { useDispatch, useSelector } from 'react-redux';
import { addDishes, getChefDishes } from '../../redux/slices/dishes.slice';
import Loading from '../../components/loading/loading';

const MyDishes = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const dishesData = useSelector((state) => state.dish.chefDishes);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [data, setData] = useState([]);
  const [image, setImage] = useState('');
  const [description, setDesciption] = useState('');
  const [open, setOpen] = useState(false);

  const imagePlaceholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpjVJ95QK9Z7ppeuEptxKb-QhLhdKkx6XbzuVd90YuJaJavpvQ2qTxDDpkH95m4A3Jbj8&usqp=CAU"

  const modalClose = () => {
    setOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: e.target.name.value,
      price: e.target.price.value,
      image: e.target.image.value,
      description: description,
      chef_id: user.id
    }
    setIsLoadingSubmit(true);
    dispatch(addDishes({
      data: payload
    })).then(() => {
      setIsLoadingSubmit(false);
      getDishesData();
      e.target.name.value = "";
      e.target.price.value = "";
      e.target.image.value = "";
      setDesciption('');
      setImage('');
      modalClose();
    })
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
      title: 'Created Date',
      key: 'createddate',
      type: 'date'
    },
    {
      title: 'Description',
      key: 'description',
      type: 'text'
    }
  ]

  const getDishesData = () => {
    setIsLoading(true);
    dispatch(
      getChefDishes({
        id: user?.id
      })
    ).then(() => {
      setIsLoading(false);
    })
  }

  const handleSearch = (text) => {
    if (dishesData && dishesData.length) {
      if (text.length >= 3) {
        const filter = dishesData.filter((e) => String(e.name).toLowerCase().includes(String(text).toLowerCase()));
        setData(filter);
      } else {
        setData(dishesData);
      }
    }
  }

  useEffect(() => {
    if(!dishesData && !dishesData?.length) {
      getDishesData();
    }
  }, [])
  useEffect(() => {
    if (dishesData && dishesData?.length) {
      setData(dishesData);
    }
  }, [dishesData])

  return (
    <div className='w-full mt-10'>
      <div className='w-full flex justify-between items-center'>
        <input type="text" className='bg-pink-100 rounded p-2.5 text-md outline-none w-80 text-gray-600 border-2 border-transparent focus:border-pink-600' placeholder='Search...' onInput={(e) => handleSearch(e.target.value)} />
        <PrimaryButton
          title="Add Items"
          icon={<IoMdAdd />}
          onClick={() => setOpen(true)}
        />
      </div>
      <div className='w-full mt-8'>
        <Table
          isloading={isLoading}
          data={data}
          headers={tableHeaders}
        />
      </div>


      <Modal title={<div className='text-lg font-extrabold tracking-widest uppercase'>Add Food Items</div>} open={open} closeIcon={null} footer={null} width={600} >
        <div className='flex justify-center items-center'>
          <img className="mx-auto h-24 w-auto rounded" src={image ? image : imagePlaceholder} alt="food-image" />
        </div>
        <form onSubmit={handleSubmit} className='mt-5'>
          <div className='flex flex-col gap-1 mt-2'>
            <label className='uppercase font-bold tracking-widest'>name <span className='text-red-800'>*</span></label>
            <input type="text" name='name' placeholder='Name *' required className='w-full bg-gray-200/50 rounded p-2.5 outline-none' />
          </div>
          <div className='flex flex-col gap-1 mt-2'>
            <label className='uppercase font-bold tracking-widest'>Price <span className='text-red-800'>*</span></label>
            <input type="number" name='price' placeholder='Price *' required className='w-full bg-gray-200/50 rounded p-2.5 outline-none' />
          </div>
          <div className='flex flex-col gap-1 mt-2'>
            <label className='uppercase font-bold tracking-widest'>Image Url <span className='text-red-800'>*</span></label>
            <input type="text" name='image' placeholder='Image Url *' required className='w-full bg-gray-200/50 rounded p-2.5 outline-none' onChange={(e) => setImage(e.target.value)} />
          </div>
          <div className='flex flex-col gap-1 mt-2'>
            <label className='uppercase font-bold tracking-widest'>Description <span className='text-red-800'>*</span></label>
            <textarea placeholder='Description *' value={description} name='description' onChange={(e) => setDesciption(e.target.value)} required className='w-full bg-gray-200/50 rounded p-2.5 outline-none' cols="60" rows="5" />
          </div>

          <div className='flex justify-end items-center gap-2 mt-10'>
            <button type='button' className='p-2.5 rounded font-semibold hover:bg-gray-400 hover:text-white disabled:cursor-not-allowed' disabled={isLoadingSubmit} onClick={modalClose}>Cancel</button>
            <button type='submit' className='bg-pink-500 text-white p-2.5 rounded font-semibold hover:bg-pink-600 flex items-center gap-1 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed' disabled={isLoadingSubmit}>
              {isLoadingSubmit && <Loading />} Submit
            </button>
          </div>
        </form>
      </Modal>

    </div>
  )
}

export default MyDishes