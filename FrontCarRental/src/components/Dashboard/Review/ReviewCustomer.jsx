import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import StarRating from './StarRating';
import {getAvisByClientID,getAllClientAvis} from '../../../services/ClientService'
  
export default function RecentRent() {
  const [clients, setClients]=useState([]);
    useEffect(()=>{
      getAllClientAvis().then((response)=>{
        setClients(response.data);
      }).catch(error=>{
        console.error(error);
      })
    },[])
    const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=5;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=clients.slice(firstIndex,lastIndex);
  const npage=Math.ceil(clients.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1)
    const [avis,setAvis]=useState({
    });
     useEffect(()=>{
        const fetch=async()=>{
          const avisdata={};
          for(const record  of records){
            try{
                const responseAvis=await getAvisByClientID(record.id);
                avisdata[record.id] = responseAvis.data;
            }catch(error){
              console.error( error);
            }
          }
          setAvis(avisdata)
        };
        fetch();
    
      }, [records]); 
  
  return (
    <div className="dark:bg-[#121212] bg-white px-4 py-3 rounded-2xl border border-gray-200 flex flex-col">
      <div className='flex flex-col items-center justify-center mx-4 my-4 sm:flex-row lg:justify-between'>
      <strong className="mb-3 text-xl text-black dark:text-white ">Recent Rent</strong>
      
      </div>
      
    
      <div className="mt-3 overflow-x-auto scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thin">
        <table className="min-w-full text-sm text-left text-gray-700 table-auto dark:text-gray-300">
          <thead className="truncate border-t mb-7">
            <tr >
              <th className="px-4 py-6">Customer</th>
              <th className="px-4 py-6">Rating</th>
              <th className="px-4 py-6">Review</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rent) => (
              <tr key={rent.id} className="hover:bg-[#fff4ea] dark:hover:bg-[#282019] ">
                <td className="px-4 py-6 ">{rent.nom}</td>
                <td className="px-4 py-6">{avis[rent.id]?.avis || 'No review available'}</td>
                <td className="px-4 py-6">
                    <StarRating rating={avis[rent.id]?.nbrEtoile}/></td>
              </tr>
            ))}
          </tbody>
        </table>
        

      </div>
      <nav className="flex items-center justify-center my-4">
          <ul className="flex items-center justify-center space-x-2">
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

