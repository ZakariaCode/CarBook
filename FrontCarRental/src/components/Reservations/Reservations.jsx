import React,{useState,useEffect} from 'react'
import {MdEdit} from 'react-icons/md'
import {listReservations,updateReservation,getClientByReservationId,getVehiculeByReservationId,getDatePaiementByReservationId} from '../../services/ReservationService'
import {updatePaiement,listPaiement} from '../../services/PaiementService'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

export default function Reservations() {
  const [reservations, setReservations]=useState([]);
  useEffect(()=>{
    listReservations().then((response)=>{
      setReservations(response.data);
    }).catch(error=>{
      console.error(error);
    })
  },[])
  const [search, setSearch]=useState('');
  /*const filteredCustomers = reservations.filter((reserv) =>
    reserv.nom && reserv.nom.toLowerCase().includes(search.toLowerCase())
  );*/
  
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=5;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=reservations.slice(firstIndex,lastIndex);
  const npage=Math.ceil(reservations.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1)
  const [editRservation, setEditRservation] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [reservation, setReservation] = useState({
    dateDebut:" ",
    dateFin:"",
    vehiculeId:"",
    clientId:"",
    paiementId:"",
    contratId:""
  });
  const [paiement, setPaiement] = useState({
    datePaiement:"",
    methodePaiement:"CREDIT_CARD",
    montant:"",
    reservationId:"",
  });
  const [selectedPaiementId, setSelectedPaiementId] = useState(null);
  const [datesPaiements, setDatesPaiements] = useState({});
  const [cars, setCars] = useState({});
  const [client, setClient] = useState({});
  const [recordsPaiement, setRecordsPaiement] = useState([]);
  useEffect(()=>{
    const fetch=async()=>{
      const dates={};
      const carsdata={};
      const clientdata={};
      for(const reserv of records){
        try{
            const responseDate=await getDatePaiementByReservationId(reserv.id);
            const responseVehicule=await getVehiculeByReservationId(reserv.id);
            const responseClient=await getClientByReservationId(reserv.id);
            const formattedDate = new Date(responseDate.data).toLocaleDateString('fr-CA');
            dates[reserv.id] = formattedDate;
            carsdata[reserv.id] = responseVehicule.data
            clientdata[reserv.id] = responseClient.data
        }catch(error){
          console.error("Erreur lors de la récupération de la date de paiement :", error);
        }
      }
      setDatesPaiements(dates);
      setCars(carsdata);
      setClient(clientdata)
    };
    fetch();

  }, [records]);

  useEffect(()=>{
    listPaiement().then((response)=>{
      setRecordsPaiement(response.data);
      }).catch(error=>{
        console.error(error);
      })
    },[])

  useEffect(()=>{
    const reser=records.find((res)=>res.id===selectedReservationId);
    if(reser){
      setSelectedPaiementId(reser.paiementId);
    }
  }, [records, selectedReservationId]);

  const EditRservation = (reservationId) => {
    setSelectedReservationId(reservationId);
    const reservationToEdit=records.find((reservation)=>reservation.id===reservationId);
    setReservation(reservationToEdit);
    setEditRservation(true); 
  };

  const closeEditRservation = () => {
    setEditRservation(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangePaiement = (e) => {
    const { name, value } = e.target;
    setPaiement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const submitEditReservation= (e)=>{
    e.preventDefault();
    updateReservation(selectedReservationId,reservation).then((response)=>{
      console.log(response.data);
    })
    updatePaiement(selectedPaiementId,paiement).then((response)=>{
      console.log(response.data);
    })
    setEditRservation(false);
    window.location.reload(); 
  };
  return (
    <>
    <div className='relative z-40  top-[-30px] left-14 lg:left-8 flex gap-4 '>
          <div className='relative'>
            <FaSearch className='absolute text-gray-500 -translate-y-1/2 bg top-1/2 left-3'></FaSearch>
            <input type='text' placeholder='Search..' onChange={(e)=>setSearch(e.target.value)}  className='text-sm rounded-full bg-white dark:bg-black focus:outline-none h-10 w-[30vw] lg:w-[20vw] px-3 pl-10  border border-gray-500'></input>
          </div>
        </div>
    <div className="dark:bg-[#121212] bg-white  px-4 py-3 rounded-2xl border border-gray-200 flex flex-col mt-10 lg:mx-10 w-screen-short ">
      <div className='flex flex-col items-center justify-between mx-4 my-4 sm:flex-row'>
      <strong className="mx-5 my-3 text-xl text-gray-700 dark:text-white ">Reservation</strong>
      
      {editRservation && selectedReservationId && (
                      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
                      {records.filter((res) => res.id === selectedReservationId).map((res) => (
                      <div className="p-6 bg-white border rounded-md shadow-md dark:bg-black w-96 border-b-gray-200">
                        <h2 className="mb-4 text-lg font-bold text-black dark:text-white">Edit Reservation</h2>
                        <form onSubmit={submitEditReservation}>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400 ">
                              Date de debut
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100bg-neutral-800 focus:ring-sky-500 focus:border-sky-500"
                              name="dateDebut"
                              placeholder="Enter date de debut"
                              value={reservation.dateDebut}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Date de fin
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              name="dateFin"
                              placeholder="Enter date de fin"
                              value={reservation.dateFin}
                              onChange={handleChange}
                            />
                          </div>
                          {recordsPaiement.filter((paiem) => res.paiementId ===paiem.id).map((paiem) => (
                          <>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Montant
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              name="montant"
                              placeholder="Enter montant"
                              value={paiement.montant}
                              onChange={handleChangePaiement}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Date de paiement
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              name="datePaiement"
                              placeholder="Enter date de paiement"
                              value={paiement.datePaiement}
                              onChange={handleChangePaiement}
                            />
                          </div>
                          </>
                          ))}
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
                              className="px-4 py-2 text-white rounded-md bg-sky-800 hover:bg-sky-950"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                      ))}
                    </div>
                    )}

      </div>
      <div className="mt-3 overflow-x-auto scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thin">
        <table className="min-w-full text-sm text-left table-auto ">
          <thead className="text-gray-500 truncate border-b mb-7 dark:text-gray-500">
            <tr >
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Car</th>
              <th className="px-4 py-3 ">Date de debut</th>
              <th className="px-4 py-3">Date de fin</th>
              <th className="px-4 py-3">Date de paiement</th>
              <th className="px-4 py-3">contrat</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 truncate border-b divide-y mb-7 dark:text-gray-100 divide-slate-100">
            {records.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-[#fff4ea] dark:hover:bg-[#282019]">
                <td className="px-4 py-3 "><Link to={`/client/${reservation.clientId}`}>{client[reservation.id]}</Link></td>
                <td className="px-4 py-3 "><Link to={`/api/cars/${reservation.vehiculeId}`}>{cars[reservation.id]}</Link></td>
                <td className="px-4 py-3 font-bold">{new Date(reservation.dateDebut).toLocaleDateString('fr-CA')}</td>
                <td className="px-4 py-3">{new Date(reservation.dateFin).toLocaleDateString('fr-CA')}</td>
                <td className="px-4 py-3">{datesPaiements[reservation.id]}</td>
                <td className="px-4 py-3">{reservation.contratId}</td>
                <td className="px-4 py-3">
                  <div className='flex flex-row gap-2 text-xl'>
                    <button className='text-sky-700' onClick={() =>EditRservation(reservation.id)}>
                    <MdEdit></MdEdit>
                    </button>
                  </div>
                </td>
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
    </>
    
    
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
