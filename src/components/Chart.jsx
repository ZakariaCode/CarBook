import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Page A',
      revenu: 4000,
      reservation: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      revenu: 3000,
      reservation: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      revenu: 2000,
      reservation: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      revenu: 2780,
      reservation: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      revenu: 1890,
      reservation: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      revenu: 2390,
      reservation: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      revenu: 3490,
      reservation: 4300,
      amt: 2100,
    },
  ];
  

export default function Chart(){
    return (
    <div className='h-[24rem] w-full dark:bg-[#121212] bg-white p-4 rounded-2xl border border-gray-200 flex flex-col flex-1 '>
        <strong class='text-black dark:text-white font font-medium mb-3'>Reservation & Revenu</strong>
        <div className='w-full mt-2 flex-1 text-xs'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={data} margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reservation" stroke="#fa851e" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="revenu" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>);
}
