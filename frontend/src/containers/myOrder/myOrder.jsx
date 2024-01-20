import React, { useEffect, useState } from 'react'
import Table from '../../components/table/table'
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrdersById } from '../../redux/slices/order.slice';

const MyOrder = () => {

  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orders);

  const tableHeaders = [
    {
      title: 'Order #',
      key: 'id',
      type: 'text'
    },
    {
      title: 'Items',
      key: '',
      type: 'text',
      render: (_, data) => {
        return (
          <div>
            {data?.items?.map((e) => `${e.quantity} ${e.name}`).join(' x ')}
          </div>
        )
      }
    },
    {
      title: 'Total Price',
      key: 'totalprice',
      type: 'text'
    },
    {
      title: 'Ordered By',
      key: 'user_name',
      type: 'text'
    },
    {
      title: 'Created Date',
      key: 'createddate',
      type: 'date'
    }
  ]

  const getMyPastOrders = () => {
    setIsLoading(true);
    dispatch(getUserOrdersById({
      id: user.id
    })).then(() => {
      setIsLoading(false);
    })
  }

  useEffect(() => {
    if (!orders && !orders?.length) {
      getMyPastOrders();
    }
  }, [])

  useEffect(() => {
    if (orders && orders?.length) {
      setData(orders);
    }
  }, [orders])

  return (
    <div className='w-full mt-5'>

      <Table
        isloading={isLoading}
        data={data}
        headers={tableHeaders}
      />



    </div>
  )
}

export default MyOrder