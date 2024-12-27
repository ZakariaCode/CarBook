import React, { useState,useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, Legend } from 'recharts';
import {nombres_communaute} from '../../services/ClientService'
import {getClientsFideles} from '../../services/ReservationService'


const COLORS = ['#4CAF50', '#FF9800', '#2196F3']; 

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
  
  return (
    <g>
      <text className='text-xl' x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.value}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default function CustomerChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);
    
    const fetchData = async () => {
      try {
        const [clientsFidelesResponse, communauteResponse] = await Promise.all([
          getClientsFideles(),
          nombres_communaute(),
        ]);
        const clientsFideles = clientsFidelesResponse.data || 0;
        const communaute = communauteResponse.data || 0;
  
        const visiteurs = 100 - clientsFideles - communaute;
        const total = clientsFideles + communaute + visiteurs;
        const updatedData = [
          { name: 'Client fidèle', value: (clientsFideles / total) * 100 },
          { name: 'Communauté', value: (communaute / total) * 100 },
          { name: 'Visiteur', value: (visiteurs / total) * 100 },
        ];
  
        setData(updatedData);
        
      } catch (error) {
        console.error( error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    const onPieEnter = (_, index) => {
      setActiveIndex(index);
    };
  return (
    <div className="h-[24rem] w-full bg-white dark:bg-[#121212] p-4 rounded-2xl border border-gray-200 flex flex-col">
      <strong className="mb-3 font-medium text-gray-700">Customer</strong>
      <div className="flex-1 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              onMouseEnter={onPieEnter}
              fill="#8884d8"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
              <Legend 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ textAlign: 'center' }}
              />
            
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
