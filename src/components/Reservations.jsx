import React,{useState} from 'react'
import {MdEdit} from 'react-icons/md'
const reservationData = [
    {
      id: 1,
      idClient: 101,
      idCar: 1,
      dateDebut: "2024-12-01",
      dateFin: "2024-12-07",
      datePaiement: "2024-11-28",
      contrat: "123ABC",
    },
    {
      id: 2,
      idClient: 102,
      idCar: 2,
      dateDebut: "2024-12-05",
      dateFin: "2024-12-10",
      datePaiement: "2024-11-29",
      contrat: "456DEF",
    },
    {
      id: 3,
      idClient: 103,
      idCar: 3,
      dateDebut: "2024-12-08",
      dateFin: "2024-12-15",
      datePaiement: "2024-12-01",
      contrat: "789GHI",
    },
    {
      id: 4,
      idClient: 104,
      idCar: 4,
      dateDebut: "2024-12-12",
      dateFin: "2024-12-20",
      datePaiement: "2024-12-03",
      contrat: "012JKL",
    },
    {
      id: 5,
      idClient: 105,
      idCar: 5,
      dateDebut: "2024-12-14",
      dateFin: "2024-12-21",
      datePaiement: "2024-12-05",
      contrat: "345MNO",
    },
    {
      id: 6,
      idClient: 106,
      idCar: 6,
      dateDebut: "2024-12-16",
      dateFin: "2024-12-22",
      datePaiement: "2024-12-08",
      contrat: "678PQR",
    },
    {
      id: 7,
      idClient: 107,
      idCar: 7,
      dateDebut: "2024-12-18",
      dateFin: "2024-12-25",
      datePaiement: "2024-12-10",
      contrat: "901STU",
    },
    {
      id: 8,
      idClient: 108,
      idCar: 8,
      dateDebut: "2024-12-20",
      dateFin: "2024-12-27",
      datePaiement: "2024-12-12",
      contrat: "234VWX",
    },
    {
      id: 9,
      idClient: 109,
      idCar: 9,
      dateDebut: "2024-12-22",
      dateFin: "2024-12-30",
      datePaiement: "2024-12-15",
      contrat: "567YZA",
    },
    {
      id: 10,
      idClient: 110,
      idCar: 10,
      dateDebut: "2024-12-24",
      dateFin: "2024-12-31",
      datePaiement: "2024-12-17",
      contrat: "890BCD",
    }
  ];
  
  
  
export default function Customers() {
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=5;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=reservationData.slice(firstIndex,lastIndex);
  const npage=Math.ceil(reservationData.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1)
  const [editRservation, setEditRservation] = useState(false);

  const EditRservation = () => {
    setEditRservation(true); 
  };

  const closeEditRservation = () => {
    setEditRservation(false);
  };

  return (
    <div className="dark:bg-[#121212] bg-white  px-4 py-3 rounded-2xl border border-gray-200 flex flex-col mt-10 lg:mx-10 w-screen-short ">
      <div className='flex flex-col sm:flex-row  items-center justify-between my-4 mx-4'>
      <strong className="text-gray-700 dark:text-white text-xl my-3 mx-5 ">Reservation</strong>
      
      {editRservation && (
                      <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
                      <div className="bg-white dark:bg-black p-6 rounded-md shadow-md w-96 border border-b-gray-200">
                        <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Edit Reservation</h2>
                        <form>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black ">
                              Date de debut
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100bg-neutral-800 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter date de debut"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Date de fin
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter date de fin"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Montant
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter montant"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Date de paiement
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter date de paiement"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              onClick={closeEditRservation}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-950"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    )}

      </div>
      <div className="mt-3 overflow-x-auto scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thin">
        <table className="min-w-full table-auto text-sm text-left  ">
          <thead className="border-b truncate mb-7 text-gray-500 dark:text-gray-500">
            <tr >
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">ID Client</th>
              <th className="px-4 py-3">ID Car</th>
              <th className="px-4 py-3 ">Date de debut</th>
              <th className="px-4 py-3">Date de fin</th>
              <th className="px-4 py-3">Date de paiement</th>
              <th className="px-4 py-3">contrat</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="border-b truncate mb-7 text-gray-600 dark:text-gray-100 divide-y divide-slate-100">
            {records.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-[#fff4ea] dark:hover:bg-[#282019]">
                <td className="px-4 py-3 ">{reservation.id}</td>
                <td className="px-4 py-3 ">{reservation.idClient}</td>
                <td className="px-4 py-3 ">{reservation.idCar}</td>
                <td className="px-4 py-3 font-bold">{reservation.dateDebut}</td>
                <td className="px-4 py-3">{reservation.dateFin}</td>
                <td className="px-4 py-3">{reservation.datePaiement}</td>
                <td className="px-4 py-3">{reservation.contrat}</td>
                <td className="px-4 py-3">
                  <div className='flex flex-row gap-2 text-xl'>
                    <button className='text-sky-700' onClick={EditRservation}>
                    <MdEdit></MdEdit>
                    </button>
                  </div>
                </td>
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
