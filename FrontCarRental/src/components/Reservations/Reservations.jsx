import React,{useState,useEffect} from 'react'
import {MdEdit} from 'react-icons/md'
import {listReservations,updateReservation,getClientByReservationId,getVehiculeByReservationId,getDatePaiementByReservationId} from '../../services/ReservationService'
import {updatePaiement,listPaiement} from '../../services/PaiementService'
import {Link} from 'react-router-dom'

export default function Reservations() {
  const [reservations, setReservations]=useState([]);
  useEffect(()=>{
    listReservations().then((response)=>{
      setReservations(response.data);
    }).catch(error=>{
      console.error(error);
    })
  },[])
  
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
    <div className="dark:bg-[#121212] bg-white  px-4 py-3 rounded-2xl border border-gray-200 flex flex-col mt-10 lg:mx-10 w-screen-short ">
      <div className='flex flex-col sm:flex-row  items-center justify-between my-4 mx-4'>
      <strong className="text-gray-700 dark:text-white text-xl my-3 mx-5 ">Reservation</strong>
      
      {editRservation && selectedReservationId && (
                      <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
                      {records.filter((res) => res.id === selectedReservationId).map((res) => (
                      <div className="bg-white dark:bg-black p-6 rounded-md shadow-md w-96 border border-b-gray-200">
                        <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Edit Reservation</h2>
                        <form onSubmit={submitEditReservation}>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black ">
                              Date de debut
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100bg-neutral-800 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              name="dateDebut"
                              placeholder="Enter date de debut"
                              value={reservation.dateDebut}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Date de fin
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              name="dateFin"
                              placeholder="Enter date de fin"
                              value={reservation.dateFin}
                              onChange={handleChange}
                            />
                          </div>
                          {recordsPaiement.filter((paiem) => res.paiementId ===paiem.id).map((paiem) => (
                          <>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Montant
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              name="montant"
                              placeholder="Enter montant"
                              value={paiement.montant}
                              onChange={handleChangePaiement}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Date de paiement
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
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
                              className="px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-950"
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
        <table className="min-w-full table-auto text-sm text-left  ">
          <thead className="border-b truncate mb-7 text-gray-500 dark:text-gray-500">
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
          <tbody className="border-b truncate mb-7 text-gray-600 dark:text-gray-100 divide-y divide-slate-100">
            {records.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-[#fff4ea] dark:hover:bg-[#282019]">
                <td className="px-4 py-3 "><Link to={`/client/${reservation.clientId}`}>{client[reservation.id]}</Link></td>
                <td className="px-4 py-3 "><Link to={`/api/cars/${reservation.vehiculeId}`}>{cars[reservation.id]}</Link></td>
                <td className="px-4 py-3 font-bold">{reservation.dateDebut}</td>
                <td className="px-4 py-3">{reservation.dateFin}</td>
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
