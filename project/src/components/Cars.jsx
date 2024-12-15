import React,{useEffect, useRef, useState} from 'react'
import image from '../assets/basil.jpg'
import {MdEdit} from 'react-icons/md'
import {BiSolidShow} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { PiWarningCircle } from "react-icons/pi";
import {IoAdd} from 'react-icons/io5'
import {listCars,createCar,updateCar,deleteVehicule,updateImage} from '../services/VehiculeService'

export default function Car() {
  const [cars, setCars]=useState([]);
  useEffect(()=>{
    listCars().then((response)=>{
      setCars(response.data);
    }).catch(error=>{
      console.error(error);
    })
  },[])
  
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=5;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=cars.slice(firstIndex,lastIndex);
  const npage=Math.ceil(cars.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1)
  const [showForm, setShowForm] = useState(false);
  const [editCar, setEditCar] = useState(false);
  const [showCar, setShowCar] = useState(false);
  const [deleteCar, setDeleteCar] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [file, setFile] = useState(undefined);
  const [vehicule, setVehicule] = useState({
    marque: "",
    modele: "",
    annee: "",
    type: "",
    tarif: "",
    statut:"disponible",
    image:"",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicule((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const saveCar=async (e)=>{
    const {data} =await createCar(vehicule);
    const formData =new FormData();
    formData.append('file',file,file.name);
    formData.append('id',data.id);
    const {data:imageUrl}=await updateImage(formData);
    console.log(imageUrl);
    setFile(undefined);
    setVehicule({});
    setShowForm(false);
  };
  const submitEditCar=async (e)=>{
    e.preventDefault();
    const {data} =await updateCar(selectedCarId,vehicule);
    const formData =new FormData();
    formData.append('file',file,file.name);
    formData.append('id',data.id);
    await updateImage(formData);
    setFile(undefined);
    setVehicule({});
    setEditCar(false);
    window.location.reload(); 
  };
  const submitDeleteCar=(e)=>{
    e.preventDefault();
    deleteVehicule(selectedCarId).then((response)=>{
      console.log(response.data);
    })
    setEditCar(false);
    window.location.reload(); 
  };

  const AddCar = () => {
    setShowForm(true); 
  };

  const closeForm = () => {
    setShowForm(false);
  };
  const EditCar = (carId) => {
    setSelectedCarId(carId);
    const carToEdit=records.find((car)=>car.id===carId);
    setVehicule(carToEdit);
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
            <form onSubmit={saveCar}>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Car Picture
                </label>
                <input
                  type="file"
                  name="image"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car Picture"
                  onChange={(event)=>setFile(event.target.files[0])}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Car Name
                </label>
                <input
                  type="text"
                  name="marque"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car name"
                  value={vehicule.marque}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Car Model
                </label>
                <input
                  type="text"
                  name="modele"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  value={vehicule.modele}
                  onChange={handleChange}
                  placeholder="Enter car model"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Année
                </label>
                <input
                  type="text"
                  name="annee"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car year"
                  value={vehicule.annee}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car type"
                  value={vehicule.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-gray-400 text-black">
                  Tarif
                </label>
                <input
                  type="text"
                  name="tarif"
                  className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car tarif"
                  value={vehicule.tarif}
                  onChange={handleChange}
                  required
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

      {editCar && selectedCarId && (
                      <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
                      {records.filter((rent) => rent.id === selectedCarId).map((rent) => (
                      <div className="bg-white p-6 rounded-md shadow-md w-96 border border-b-gray-200" key={rent.id}>
                        <h2 className="text-lg font-bold mb-4">Edit Car</h2>
                        <form onSubmit={submitEditCar}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Car Picture
                            </label>
                            <input
                              type="file"
                              name="image"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car Picture"
                              onChange={(event)=>setFile(event.target.files[0])}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Car Name
                            </label>
                            <input
                              type="text"
                              name="marque"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car name"
                              value={vehicule.marque}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Car Model
                            </label>
                            <input
                              type="text"
                              name="modele"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              value={vehicule.modele}
                              onChange={handleChange}
                              placeholder="Enter car model"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Année
                            </label>
                            <input
                              type="text"
                              name="annee"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car year"
                              value={vehicule.annee}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Type
                            </label>
                            <input
                              type="text"
                              name="type"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car type"
                              value={vehicule.type}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Tarif
                            </label>
                            <input
                              type="text"
                              name="tarif"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car tarif"
                              value={vehicule.tarif}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium dark:text-gray-400 text-black">
                              Statut
                            </label>
                            <input
                              type="text"
                              name="statut"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car statut"
                              value={vehicule.statut}
                              onChange={handleChange}
                              required
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
                      ))}
                    </div>
                    )}
                    {showCar && selectedCarId && (
                      <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-md shadow-md w-96 lg:w-1/3 border border-b-gray-200">
                          <h2 className="text-lg font-bold mb-4">Show Car</h2>    
                          {records.filter((rent) => rent.id === selectedCarId).map((rent) => (
                          <div key={rent.id}>
                          <div className='h-60 w-full rounded-md bg-sky-500 bg-cover bg-center mb-5'>
                            <img src={rent.image} alt="Car" className="w-full h-full object-cover rounded-md"/>
                          </div>
                          <div className="flex flex-col  " >
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
                          </div>
                          ))}
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              className="flex flex-row justify-center items-center gap-2 w-full px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              onClick={closeShowCar}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {deleteCar  && (
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
                            onClick={submitDeleteCar}>
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
                  <div className='h-11 w-11 rounded-2xl bg-sky-500 bg-cover bg-center ' style={{ backgroundImage: `url(${rent.image})` }}></div>
                    {rent.marque}
                  
                </td>
                <td className="px-4 py-3 font-bold">{rent.modele}</td>
                <td className="px-4 py-3">{rent.annee}</td>
                <td className="px-4 py-3">{rent.type}</td>
                <td className="px-4 py-3">{rent.tarif}</td>
                <td className="px-4 py-3">
                  {rent.statut === "louee" && <span className="bg-yellow-500/50 rounded-md px-2 py-1 w-28 inline-block text-center text-yellow-500 font-bold ">Louée</span>}
                  {rent.statut === "disponible" && <span className="bg-green-500/50 rounded-md px-2 py-1 w-28 inline-block text-center text-green-900 font-bold ">Disponible</span>}
                  {rent.statut === "en_maintenance" && <span className="bg-red-500/50 rounded-md px-2 py-1 w-28 inline-block text-center text-red-700 font-bold ">Maintenance</span>}
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
