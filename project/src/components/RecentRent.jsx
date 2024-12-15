import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

const recentData = [
    { 
      id: 1, 
      id_vehicule: 'V123', 
      id_user: 'U456', 
      date_debut: '2024-01-01', 
      date_fin: '2024-01-10', 
      date_paiement: '2024-01-05', 
      numero_contrat: 'C789', 
      date_contrat: '2024-01-01' 
    },
    { 
      id: 2, 
      id_vehicule: 'V124', 
      id_user: 'U457', 
      date_debut: '2024-02-01', 
      date_fin: '2024-02-10', 
      date_paiement: '2024-02-05', 
      numero_contrat: 'C790', 
      date_contrat: '2024-02-01' 
    },
    { 
      id: 3, 
      id_vehicule: 'V125', 
      id_user: 'U458', 
      date_debut: '2024-03-01', 
      date_fin: '2024-03-10', 
      date_paiement: '2024-03-05', 
      numero_contrat: 'C791', 
      date_contrat: '2024-03-01' 
    },
    { 
      id: 4, 
      id_vehicule: 'V124', 
      id_user: 'U457', 
      date_debut: '2024-02-01', 
      date_fin: '2024-02-10', 
      date_paiement: '2024-02-05', 
      numero_contrat: 'C790', 
      date_contrat: '2024-02-01' 
    },
    { 
      id: 5, 
      id_vehicule: 'V125', 
      id_user: 'U458', 
      date_debut: '2024-03-01', 
      date_fin: '2024-03-10', 
      date_paiement: '2024-03-05', 
      numero_contrat: 'C791', 
      date_contrat: '2024-03-01' 
    },
    { 
      id: 6, 
      id_vehicule: 'V124', 
      id_user: 'U457', 
      date_debut: '2024-02-01', 
      date_fin: '2024-02-10', 
      date_paiement: '2024-02-05', 
      numero_contrat: 'C790', 
      date_contrat: '2024-02-01' 
    },
    { 
      id: 7, 
      id_vehicule: 'V125', 
      id_user: 'U458', 
      date_debut: '2024-03-01', 
      date_fin: '2024-03-10', 
      date_paiement: '2024-03-05', 
      numero_contrat: 'C791', 
      date_contrat: '2024-03-01' 
    }
  ];
  
export default function RecentRent() {
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=5;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=recentData.slice(firstIndex,lastIndex);
  const npage=Math.ceil(recentData.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1)
  return (
    <div className="dark:bg-[#121212] bg-white px-4 py-3 rounded-2xl border border-gray-200 flex flex-col">
      <div className='flex flex-col sm:flex-row justify-center items-center lg:justify-between my-4 mx-4'>
      <strong className="text-black dark:text-white text-xl mb-3 ">Recent Rent</strong>
      <div className='relative '>
          <FaSearch className='text-gray-500 absolute top-1/2 -translate-y-1/2 left-3'></FaSearch>
          <input type='text' placeholder='Search..' className='text-sm rounded-full focus:outline-none h-10 w-[40vw] lg:w-[20vw] px-3 pl-10 my-4  border border-gray-400 hover:border-gray-500 dark:border-gray-400 dark:hover:border-gray-500 bg-gray-200 dark:bg-gray-900'></input>
        </div>
      </div>
    
      <div className="mt-3 overflow-x-auto scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thin">
        <table className="min-w-full table-auto text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="border-t truncate mb-7">
            <tr >
              <th className="px-4 py-6">ID</th>
              <th className="px-4 py-6 ">ID Véhicule</th>
              <th className="px-4 py-6">ID User</th>
              <th className="px-4 py-6">Date de Début</th>
              <th className="px-4 py-6">Date de Fin</th>
              <th className="px-4 py-6">Date Paiement</th>
              <th className="px-4 py-6">N° Contrat</th>
              <th className="px-4 py-6">Date Contrat</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rent) => (
              <tr key={rent.id} className="hover:bg-[#fff4ea] dark:hover:bg-[#282019] ">
                <td className="px-4 py-6 ">{rent.id}</td>
                <td className="px-4 py-6"><Link to={`/cars/${rent.id_vehicule}`}>{rent.id_vehicule}</Link></td>
                <td className="px-4 py-6"><Link to={`/cars/${rent.id_user}`}>{rent.id_user}</Link></td>
                <td className="px-4 py-6">{rent.date_debut}</td>
                <td className="px-4 py-6">{rent.date_fin}</td>
                <td className="px-4 py-6">{rent.date_paiement}</td>
                <td className="px-4 py-6">{rent.numero_contrat}</td>
                <td className="px-4 py-6">{rent.date_contrat}</td>
              </tr>
            ))}
          </tbody>
        </table>
        

      </div>
      <nav className="flex justify-center items-center my-4">
          <ul className="flex space-x-2 justify-center items-center">
            <li className="page-item ">
              <button className={`page-link ${currentPage === 1 ? " text-gray-700" : " text-amber-500"} 
                  px-3 py-2 my-3`} onClick={prePage}
              >
                Prev
              </button>
            </li>
            {
              numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? "bg-amber-500 text-white hover:bg-amber-700" : "text-amber-500  "} 
                  px-3 py-2 my-3 w-8 h-8 flex justify-center items-center   hover:text-white rounded-full `}
                  key={i}>
                  <button onClick={() => changeCPage(n)}>
                    {n}
                  </button>
                </li>
              ))
            }
            <li className="page-item">
              <button className={`page-link ${currentPage === npage ? " text-gray-700" : " text-amber-500"} 
                  px-3 py-2 my-3`}  onClick={nextPage}>Next</button>
            </li>
          </ul>
        </nav>
    </div>
    
  )
  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  }
  function changeCPage(n){
    setCurrentPage(n)
  }
  function nextPage(){
    if(currentPage !== npage){
      setCurrentPage(currentPage+1)
    }
  }
}

