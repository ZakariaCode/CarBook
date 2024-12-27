import React,{useEffect, useState} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {getRevenuParMois} from '../../services/PaiementService'
import {getNombreReservationsParMois} from '../../services/ReservationService'
export default function Chart(){
  const [data, setData]=useState([]);
  useEffect(() => {
    const monthNames = ["Janv", "Févr", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept", "Oct", "Nov", "Déc"];

    Promise.all([
      getRevenuParMois(2024),
      getNombreReservationsParMois(2024)
    ])
      .then(([revenuResponse, reservationsResponse]) => {
        const revenus = revenuResponse.data.map(item => ({
          mois: item[0],
          revenu: item[1],
        }));

        const reservations = reservationsResponse.data.map(item => ({
          mois: item[0],
          reservations: item[1],
        }));
        const mergedData = monthNames.map((name, index) => {
          const moisIndex = index + 1;
          const revenuItem = revenus.find(item => item.mois === moisIndex) || { revenu: 0 };
          const reservationItem = reservations.find(item => item.mois === moisIndex) || { reservations: 0 };

          return {
            name,
            revenu: revenuItem.revenu,
            reservation: reservationItem.reservations,
          };
        });

        setData(mergedData);
        console.log(mergedData);
      })
      .catch(error => console.error("Error fetching data", error));
  }, []);
    return (
    <div className='h-[24rem] w-full dark:bg-[#121212] bg-white p-4 rounded-2xl border border-gray-200 flex flex-col flex-1 '>
        <strong class='text-black dark:text-white font font-medium mb-3'>Reservation & Revenu</strong>
        <div className='flex-1 w-full mt-2 text-xs'>
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
