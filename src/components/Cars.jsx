import React,{useState} from 'react'
import image from '../assets/basil.jpg'
import {MdEdit} from 'react-icons/md'
import {BiSolidShow} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { PiWarningCircle } from "react-icons/pi";
import {IoAdd} from 'react-icons/io5'
const carData = [
  {
    id: 1,
    marque: "Toyota",
    modele: "Corolla",
    annee: 2020,
    type: "Berline",
    tarif: "40€/jour",
    statut: "Disponible",
  },
  {
    id: 2,
    marque: "Tesla",
    modele: "Model 3",
    annee: 2022,
    type: "Électrique",
    tarif: "80€/jour",
    statut: "Louée",
  },
  {
    id: 3,
    marque: "Ford",
    modele: "Mustang",
    annee: 2018,
    type: "Sport",
    tarif: "100€/jour",
    statut: "Disponible",
  },
  {
    id: 4,
    marque: "Renault",
    modele: "Clio",
    annee: 2019,
    type: "Compacte",
    tarif: "30€/jour",
    statut: "En maintenance",
  },
  {
    id: 5,
    marque: "Volkswagen",
    modele: "Golf",
    annee: 2021,
    type: "Compacte",
    tarif: "35€/jour",
    statut: "Disponible",
  },
  {
    id: 6,
    marque: "BMW",
    modele: "X5",
    annee: 2020,
    type: "SUV",
    tarif: "120€/jour",
    statut: "Louée",
  },
  {
    id: 7,
    marque: "Audi",
    modele: "A4",
    annee: 2021,
    type: "Berline",
    tarif: "70€/jour",
    statut: "Disponible",
  },
  {
    id: 8,
    marque: "Peugeot",
    modele: "208",
    annee: 2019,
    type: "Compacte",
    tarif: "25€/jour",
    statut: "Louée",
  },
  {
    id: 9,
    marque: "Nissan",
    modele: "Leaf",
    annee: 2022,
    type: "Électrique",
    tarif: "50€/jour",
    statut: "Disponible",
  },
  {
    id: 10,
    marque: "Mercedes-Benz",
    modele: "E-Class",
    annee: 2020,
    type: "Berline",
    tarif: "90€/jour",
    statut: "En maintenance",
  },
];
export default function Car() {
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=5;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=carData.slice(firstIndex,lastIndex);
  const npage=Math.ceil(carData.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1)
  const [showForm, setShowForm] = useState(false);
  const [editCar, setEditCar] = useState(false);
  const [showCar, setShowCar] = useState(false);
  const [deleteCar, setDeleteCar] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null); 

  const AddCar = () => {
    setShowForm(true); 
  };

  const closeForm = () => {
    setShowForm(false);
  };
  const EditCar = (carId) => {
    setSelectedCarId(carId);
    setEditCar(true); 
  };

  const closeEditCar = () => {
    setEditCar(false);
  };
  const ShowCar = (carId) => {
    setSelectedCarId(carId);
    setShowCar(true); 
  };

  const closeShowCar = () => {
    setShowCar(false);
  };
  const DeleteCar = (carId) => {
    setSelectedCarId(carId);
    setDeleteCar(true); 
  };

  const closeDeleteCar = () => {
    setDeleteCar(false);
  };

  return (
    <div className="bg-white dark:bg-[#121212]  px-4 py-3 rounded-2xl border border-gray-200 flex flex-col mt-10 lg:mx-10 w-screen-short ">
      <div className='flex flex-col sm:flex-row  items-center justify-between my-4 mx-4'>
      <strong className="dark:text-white text-black  text-xl my-3 mx-5 ">Cars</strong>
      <button className='flex flex-row justify-center items-center bg-sky-800 mx-5 rounded-md px-3 py-1 hover:bg-sky-950'
      onClick={AddCar}>
        <IoAdd className="text-gray-200 text-2xl "></IoAdd>
        <strong className="text-gray-200 text-sm ml-2 ">Add Car</strong>
      </button>
      
      {showForm && (
        <div className="fixed inset-0 bg-gray-950/50 z-30 flex justify-center items-center">
          <div className="bg-white dark:bg-black p-6 rounded-md shadow-md w-96 border border-b-gray-200">
            <h2 className="text-lg font-bold mb-4 dark:text-white text-black">Add a New Car</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black ">
                  Car Name
                </label>
                <input
                  type="text"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Car Model
                </label>
                <input
                  type="text"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car model"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Annee
                </label>
                <input
                  type="text"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car model"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Type
                </label>
                <input
                  type="text"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car type"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Tarif
                </label>
                <input
                  type="text"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car tarif"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={closeForm}
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
      {editCar && (
                      <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
                      <div className="bg-white p-6 rounded-md shadow-md w-96 border border-b-gray-200">
                        <h2 className="text-lg font-bold mb-4">Edit Car</h2>
                        <form>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 ">
                              Car Name
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car name"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                              Car Model
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car model"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                              Annee
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car model"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                              Type
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car type"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                              Tarif
                            </label>
                            <input
                              type="text"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car tarif"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              onClick={closeEditCar}
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
                    {showCar && selectedCarId && (
                      <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-md shadow-md w-96 lg:w-1/3 border border-b-gray-200">
                          <h2 className="text-lg font-bold mb-4">Show Car</h2>
                          
                          <div className='h-60 w-full rounded-md bg-sky-500 bg-cover bg-center mb-5' style={{ backgroundImage: `url(${image})` }}></div>
                          {records.filter((rent) => rent.id === selectedCarId).map((rent) => (
                            
                          <div className="flex flex-col  " key={rent.id}>
                            <div className="flex flex-row  ">
                              <div className="text-sm  dark:bg-neutral-800 bg-neutral-100 flex flex-col font-medium text-gray-700 border border-gray-500 rounded-md px-3 m-3 pt-3" style={{ width: '200px', height:'80px'}}>
                                <strong>Marque</strong>
                                <p className='p-3'>{rent.marque}</p> 
                              </div>
                              <div className="text-sm  dark:bg-neutral-800 bg-neutral-100 flex flex-col font-medium text-gray-700 border border-gray-500 rounded-md px-3 m-3 pt-3" style={{ width: '200px', height:'80px'}}>
                                <strong>Model</strong>
                                <p className='p-3'>{rent.modele}</p> 
                              </div>
                            </div>
                            
                            <div className="flex flex-row  ">
                              <div className="text-sm  dark:bg-neutral-800 bg-neutral-100 flex flex-col font-medium text-gray-700 border border-gray-500 rounded-md px-3 m-3 pt-3" style={{ width: '200px', height:'80px'}}>
                                <strong>Annee</strong>
                                <p className='p-3'>{rent.annee}</p> 
                              </div>
                              <div className="text-sm  dark:bg-neutral-800 bg-neutral-100 flex flex-col font-medium text-gray-700 border border-gray-500 rounded-md px-3 m-3 pt-3" style={{ width: '200px', height:'80px'}}>
                                <strong>Type</strong>
                                <p className='p-3'>{rent.type}</p> 
                              </div>
                            </div>
                            <div className="flex flex-row ">
                              <div className="text-sm  dark:bg-neutral-800 bg-neutral-100 flex flex-col font-medium text-gray-700 border border-gray-500 rounded-md px-3 m-4 pt-3" style={{ width: '200px', height:'80px'}}>
                                <strong>Tarif</strong>
                                <p className='p-2'>{rent.tarif}</p> 
                              </div>
                              <div className="text-sm  dark:bg-neutral-800 bg-neutral-100 flex flex-col font-medium text-gray-700 border border-gray-500 rounded-md px-3 m-4 pt-3" style={{ width: '200px', height:'80px'}}>
                                <strong>Statut</strong>
                                <p className='p-2'>{rent.statut}</p> 
                              </div>
                            </div>
                          </div>
                          ))}
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              className="flex flex-row justify-center items-center gap-2 w-1/3 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              onClick={closeShowCar}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="flex flex-row justify-center items-center gap-2 w-1/3 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-sky-950"
                            >
                              <MdEdit></MdEdit>
                              Edit
                            </button>
                            <button
                              type="submit"
                              className="flex flex-row justify-center items-center gap-2 w-1/3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-sky-950"
                            >
                              <MdDelete></MdDelete>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {deleteCar && (
                      <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
                      <div className="bg-white p-6 rounded-md shadow-md w-2/3  lg:1/3 md:w-1/3 border border-b-gray-200">
                        <div className='pb-7 gap-3 flex flex-col justify-center items-center'>
                          <div className='text-6xl'>
                            <PiWarningCircle></PiWarningCircle>
                          </div>
                          <p>Are you sure you want to delete this Car?</p>
                        </div>
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              className="flex flex-row justify-center items-center gap-2 w-1/2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              onClick={closeDeleteCar}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="flex flex-row justify-center items-center gap-2 w-1/2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-sky-950"
                            >
                              <MdDelete></MdDelete>
                              Delete
                            </button>
                          </div>
                      </div>
                    </div>
                    )}

      </div>
      <div className="mt-3 overflow-x-auto scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thin">
        <table className="min-w-full table-auto text-sm text-left  ">
          <thead className="border-b truncate mb-7 text-gray-500 dark:text-gray-400">
            <tr >
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3 ">Modele</th>
              <th className="px-4 py-3">Année</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Tarif</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="border-b truncate mb-7 text-gray-600 dark:text-gray-100 divide-y divide-slate-100">
            {records.map((rent) => (
              <tr key={rent.id} className="hover:bg-[#fff4ea] dark:hover:bg-[#282019]">
                <td className="px-4 py-3 flex gap-4 items-center font-bold text-gray-500 dark:text-gray-100">
                  <div className='h-11 w-11 rounded-2xl bg-sky-500 bg-cover bg-center ' style={{ backgroundImage: `url(${image})` }}></div>
                    {rent.marque}
                  
                </td>
                <td className="px-4 py-3 font-bold">{rent.modele}</td>
                <td className="px-4 py-3">{rent.annee}</td>
                <td className="px-4 py-3">{rent.type}</td>
                <td className="px-4 py-3">{rent.tarif}</td>
                <td className="px-4 py-3">
                  {rent.statut === "Louée" && <span className="bg-yellow-500/50 rounded-md px-2 py-1 w-28 inline-block text-center text-yellow-500 font-bold ">{rent.statut}</span>}
                  {rent.statut === "Disponible" && <span className="bg-green-500/50 rounded-md px-2 py-1 w-28 inline-block text-center text-green-900 font-bold ">{rent.statut}</span>}
                  {rent.statut === "En maintenance" && <span className="bg-red-500/50 rounded-md px-2 py-1 w-28 inline-block text-center text-red-700 font-bold ">{rent.statut}</span>}
                </td>

                <td className="px-4 py-3">
                  <div className='flex flex-row gap-2 text-xl'>
                    <button className='text-sky-700' onClick={() =>EditCar(rent.id)}>
                    <MdEdit></MdEdit>
                    </button>
                    
                    <button className='text-green-700' onClick={() => ShowCar(rent.id)} >
                    <BiSolidShow></BiSolidShow>
                    </button>
                    <button className='text-red-600' onClick={() =>DeleteCar(rent.id)}>
                    <MdDelete></MdDelete>
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
