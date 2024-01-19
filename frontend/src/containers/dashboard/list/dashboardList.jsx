import React from 'react'
import Table from '../../../components/table/table'

const DashboardList = ({ data, isLoading }) => {

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