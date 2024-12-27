import React,{useEffect, useRef, useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'
import {BiSolidShow} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { PiWarningCircle } from "react-icons/pi";
import {IoAdd} from 'react-icons/io5'
import {listCars,createCar,updateCar,deleteVehicule,updateImage,getImage} from '../../services/VehiculeService'
import { FaFilter } from "react-icons/fa";
import { IoMdMenu } from 'react-icons/io'
import { Menu } from '@headlessui/react'
import {TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti'
import { MdDateRange } from "react-icons/md";
import { TiArrowDown,TiArrowUp } from "react-icons/ti";

export default function Car(theme) {
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
  
  
  const [showForm, setShowForm] = useState(false);
  const [editCar, setEditCar] = useState(false);
  const [showCar, setShowCar] = useState(false);
  const [deleteCar, setDeleteCar] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [file, setFile] = useState(undefined);
  const [search, setSearch]=useState('');
  const [filter, setFilter]=useState({
    tarif:"",
    type:""
  });
  const [filterStatus, setFilterStatus]=useState('');
  const [filterDate, setFilterDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [vehicule, setVehicule] = useState({
    marque: "",
    modele: "",
    annee: "",
    type: "",
    tarif: "",
    statut:"",
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
    e.preventDefault();
    const {data} =await createCar(vehicule);
    const formData =new FormData();
    formData.append('file',file,file.name);
    formData.append('id',data.id);
    await updateImage(formData);
    console.log(formData);
    setFile(undefined);
    setVehicule({});
    setShowForm(false);
    window.location.reload(); 
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
  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);

  const toggleDropdown = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  const filteredCars = cars.filter((rent) => {
    const matchesSearch =
      search.toLowerCase() === '' ||
      rent.modele.toLowerCase().includes(search.toLowerCase()) ||
      rent.marque.toLowerCase().includes(search.toLowerCase());
    const matchesAnnee = !filterDate || filterDate ===  rent.annee.toString();;
    const matchesStatus = !filterStatus || filterStatus === rent.statut;
    return matchesSearch && matchesAnnee && matchesStatus;
  });
  const records=filteredCars.slice(firstIndex,lastIndex);
  const npage=Math.ceil(filteredCars.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1)
  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };
  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };
  const handleSelectClick = (e) => {
    e.stopPropagation();
  };
  const ChangeReset = () => {
    setFilterStatus("");
    setFilterDate("");
  };
  const ChangeApply = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  const [sort,setSort]=useState({
    KeyToSort: "MAKE",
    direction: "asc",
  });
  const headers = [
    { LABEL: 'Marque', KEY: 'marque' },
    { LABEL: 'Modele', KEY: 'modele' },
    { LABEL: 'Année', KEY: 'annee' },
    { LABEL: 'Type', KEY: 'type' },
    { LABEL: 'Tarif', KEY: 'tarif' },
  ];
  const handelClickSort = (header) => {
    setSort({
      KeyToSort: header.KEY,
    direction:
      header.KEY===sort.KeyToSort ?
       sort.direction==='asc'? 'desc' : 'asc' 
       : 'asc',
    })
  };
  const getSortedArray = (arrayToSort) => {
    if (sort.direction === 'asc') {
      return arrayToSort.sort((a, b) => (a[sort.KeyToSort] > b[sort.KeyToSort] ? 1 : -1));
    }
    return arrayToSort.sort((a, b) => (a[sort.KeyToSort] > b[sort.KeyToSort] ? -1 : 1));
  };  
  
  return (
    <>
    <div className='relative z-40  top-[-30px] left-14 lg:left-8 flex gap-4 '>
      <div className='relative'>
        <FaSearch className='absolute text-gray-500 -translate-y-1/2 bg top-1/2 left-3'></FaSearch>
        <input type='text' placeholder='Search..' onChange={(e)=>setSearch(e.target.value)}  className='text-sm rounded-full bg-white dark:bg-black focus:outline-none h-10 w-[30vw] lg:w-[20vw] px-3 pl-10  border border-gray-500'></input>
      </div>
    </div>
    
    
    <div className="bg-white dark:bg-[#121212]  px-4 py-3 rounded-2xl border border-gray-200 flex flex-col mt-10 lg:mx-10 w-screen-short ">
      <div className='flex flex-col items-center justify-between mx-4 my-4 sm:flex-row'>
      <strong className="mx-5 my-3 text-xl text-black dark:text-white ">Cars</strong>
      <div className='flex flex-row my-4'>
        
        <button className='flex flex-row items-center justify-center px-3 py-1 mx-2 rounded-md bg-sky-800 hover:bg-sky-950'
      onClick={toggleDropdown} >
        <FaFilter className="text-xl text-gray-200 "></FaFilter>
        <strong className="ml-2 text-sm text-gray-200 ">Filter</strong>
        {isOpenFilter ? (
                        <>
                        <TiArrowSortedUp fontSize={20} />
                        <div className="absolute w-64 bg-white rounded-md shadow-lg mt-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <div className="px-4 py-2">
                              <strong className="block mb-3 text-sm text-gray-700">Status</strong>
                              <select
                                value={filterStatus}
                                onChange={handleStatusChange}
                                onClick={handleSelectClick}
                                className="block w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md"
                              >
                                <option value="">Select Status</option>
                                <option value="louee">Louee</option>
                                <option value="disponible">Disponible</option>
                                <option value="en_maintenance">Maintenance</option>
                              </select>
                            </div>
                            <div className="px-4 py-2">
                              <strong className="block mb-3 text-sm text-gray-700">Select Date</strong>
                              <select
                                value={filterDate}
                                onChange={handleDateChange}
                                onClick={handleSelectClick}
                                className="block w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md"
                              >
                                <option value="">Select annee</option>
                                {cars
                                  .filter((rent, index, self) => self.findIndex(r => r.annee === rent.annee) === index)
                                  .map((rent) => (
                                    <option value={rent.annee} key={rent.id}>
                                      {rent.annee}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="flex flex-row items-center justify-between mx-2">
                            <button className='justify-center w-1/3 px-3 py-1 m-2 rounded-md bg-sky-800 hover:bg-sky-950'
                          onClick={ChangeReset} >Reset</button>
                          <button className='justify-center w-1/3 px-3 py-1 m-2 rounded-md bg-sky-800 hover:bg-sky-950'
                          onClick={ChangeApply} >Apply</button>
                            </div>
                            
                          </div>
                          
                        </div>
                      </>
                      ) : (
                        <TiArrowSortedDown fontSize={20} />
                      )}
      </button>
      <button className='flex flex-row items-center justify-center px-3 py-1 mx-2 rounded-md bg-sky-800 hover:bg-sky-950'
      onClick={AddCar}>
        <IoAdd className="text-2xl text-gray-200 "></IoAdd>
        <strong className="ml-2 text-sm text-gray-200 ">Add Car</strong>
      </button>
      </div>
      
      
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50">
          <div className="p-6 bg-white border rounded-md shadow-md dark:bg-black w-96 border-b-gray-200">
            <h2 className="mb-4 text-lg font-bold text-black dark:text-white">Add a New Car</h2>
            <form onSubmit={saveCar}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black dark:text-gray-400">
                  Car Picture
                </label>
                <input
                  type="file"
                  name="image"
                  className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car Picture"
                  onChange={(event)=>setFile(event.target.files[0])}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black dark:text-gray-400">
                  Car Name
                </label>
                <input
                  type="text"
                  name="marque"
                  className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car name"
                  value={vehicule.marque}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black dark:text-gray-400">
                  Car Model
                </label>
                <input
                  type="text"
                  name="modele"
                  className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                  value={vehicule.modele}
                  onChange={handleChange}
                  placeholder="Enter car model"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black dark:text-gray-400">
                  Année
                </label>
                <input
                  type="text"
                  name="annee"
                  className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car year"
                  value={vehicule.annee}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black dark:text-gray-400">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car type"
                  value={vehicule.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black dark:text-gray-400">
                  Tarif
                </label>
                <input
                  type="text"
                  name="tarif"
                  className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter car tarif"
                  value={vehicule.tarif}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Statut
                            </label>
                            <select
                              name="statut"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              value={vehicule.statut}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select status</option>
                              <option value="louee">louée</option>
                              <option value="disponible">disponible</option>
                              <option value="en_maintenance">en maintenance</option>
                            </select>
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
                  className="px-4 py-2 text-white rounded-md bg-sky-800 hover:bg-sky-950"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editCar && selectedCarId && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      {cars.filter((rent) => rent.id === selectedCarId).map((rent) => (
                      <div className="p-6 bg-white border rounded-md shadow-md w-96 border-b-gray-200" key={rent.id}>
                        <h2 className="mb-4 text-lg font-bold">Edit Car</h2>
                        <form onSubmit={submitEditCar}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Car Picture
                            </label>
                            <input
                              type="file"
                              name="image"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car Picture"
                              onChange={(event)=>setFile(event.target.files[0])}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Car Name
                            </label>
                            <input
                              type="text"
                              name="marque"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car name"
                              value={vehicule.marque}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Car Model
                            </label>
                            <input
                              type="text"
                              name="modele"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              value={vehicule.modele}
                              onChange={handleChange}
                              placeholder="Enter car model"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Année
                            </label>
                            <input
                              type="text"
                              name="annee"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car year"
                              value={vehicule.annee}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Type
                            </label>
                            <input
                              type="text"
                              name="type"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car type"
                              value={vehicule.type}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Tarif
                            </label>
                            <input
                              type="text"
                              name="tarif"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter car tarif"
                              value={vehicule.tarif}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-black dark:text-gray-400">
                              Statut
                            </label>
                            <select
                              name="statut"
                              className="w-full p-2 mt-1 border rounded-md dark:bg-neutral-800 bg-neutral-100 focus:ring-sky-500 focus:border-sky-500"
                              value={vehicule.statut}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select status</option>
                              <option value="louee">louée</option>
                              <option value="disponible">disponible</option>
                              <option value="en_maintenance">en maintenance</option>
                            </select>
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
                    {showCar && selectedCarId && (
                      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
                        <div className="p-6 bg-white border rounded-md shadow-md w-96 lg:w-1/3 border-b-gray-200">
                          <h2 className="mb-4 text-lg font-bold">Show Car</h2>    
                          {cars.filter((rent) => rent.id === selectedCarId).map((rent) => (
                          <div key={rent.id}>
                          <div className='w-full mb-5 bg-center bg-cover rounded-md h-60 bg-sky-500'>
                            <img src={rent.image} alt="Car" className="object-cover w-full h-full rounded-md"/>
                          </div>
                          <div className="flex flex-col " >
                            <div className="flex flex-row ">
                              <div className="flex flex-col px-3 pt-3 m-3 text-sm font-medium text-gray-700 border border-gray-500 rounded-md dark:bg-neutral-800 bg-neutral-100" style={{ width: '200px', height:'80px'}}>
                                <strong>Marque</strong>
                                <p className='p-3'>{rent.marque}</p> 
                              </div>
                              <div className="flex flex-col px-3 pt-3 m-3 text-sm font-medium text-gray-700 border border-gray-500 rounded-md dark:bg-neutral-800 bg-neutral-100" style={{ width: '200px', height:'80px'}}>
                                <strong>Model</strong>
                                <p className='p-3'>{rent.modele}</p> 
                              </div>
                            </div>
                            <div className="flex flex-row ">
                              <div className="flex flex-col px-3 pt-3 m-3 text-sm font-medium text-gray-700 border border-gray-500 rounded-md dark:bg-neutral-800 bg-neutral-100" style={{ width: '200px', height:'80px'}}>
                                <strong>Annee</strong>
                                <p className='p-3'>{rent.annee}</p> 
                              </div>
                              <div className="flex flex-col px-3 pt-3 m-3 text-sm font-medium text-gray-700 border border-gray-500 rounded-md dark:bg-neutral-800 bg-neutral-100" style={{ width: '200px', height:'80px'}}>
                                <strong>Type</strong>
                                <p className='p-3'>{rent.type}</p> 
                              </div>
                            </div>
                            <div className="flex flex-row ">
                              <div className="flex flex-col px-3 pt-3 m-4 text-sm font-medium text-gray-700 border border-gray-500 rounded-md dark:bg-neutral-800 bg-neutral-100" style={{ width: '200px', height:'80px'}}>
                                <strong>Tarif</strong>
                                <p className='p-2'>{rent.tarif}</p> 
                              </div>
                              <div className="flex flex-col px-3 pt-3 m-4 text-sm font-medium text-gray-700 border border-gray-500 rounded-md dark:bg-neutral-800 bg-neutral-100" style={{ width: '200px', height:'80px'}}>
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
                              className="flex flex-row items-center justify-center w-full gap-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              onClick={closeShowCar}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {deleteCar  && (
                      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
                      <div className="w-2/3 p-6 bg-white border rounded-md shadow-md lg:1/3 md:w-1/3 border-b-gray-200">
                        <div className='flex flex-col items-center justify-center gap-3 pb-7'>
                          <div className='text-6xl'>
                            <PiWarningCircle></PiWarningCircle>
                          </div>
                          <p>Are you sure you want to delete this Car?</p>
                        </div>
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              className="flex flex-row items-center justify-center w-1/2 gap-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              onClick={closeDeleteCar}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="flex flex-row items-center justify-center w-1/2 gap-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-sky-950"
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
        <table className="min-w-full text-sm text-left table-auto ">
          <thead className="text-gray-500 truncate border-b mb-7 dark:text-gray-400">
            <tr >
              {headers.map((header,index)=>(
            <th className="px-4 py-3 cursor-pointer" key={index} onClick={() => handelClickSort(header)} >
              <div className="flex items-center">
                <label>{header.LABEL}</label>
                {/*{header.KEY===sort.KeyToSort && (*/}
                  <div className="flex items-center justify-center ml-2">
                    {sort.direction === 'asc' ? (
                      <TiArrowUp fontSize={20} />
                    ) : (
                      <TiArrowDown fontSize={20} />
                    )}
                  </div>              
                {/*)}*/}
                  </div>
            </th>
            ))}
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 truncate border-b divide-y mb-7 dark:text-gray-100 divide-slate-100">
            {getSortedArray(records).map((rent) => (
              <tr key={rent.id} className="hover:bg-[#fff4ea] dark:hover:bg-[#282019]">
                <td className="flex items-center gap-4 px-4 py-3 font-bold text-gray-500 dark:text-gray-100">
                  <div className='bg-center bg-cover h-11 w-11 rounded-2xl bg-sky-500 ' style={{ backgroundImage: `url(${rent.image})` }}></div>
                    {rent.marque}
                </td>
                <td className="px-4 py-3 font-bold">{rent.modele}</td>
                <td className="px-4 py-3">{rent.annee}</td>
                <td className="px-4 py-3">{rent.type}</td>
                <td className="px-4 py-3">{rent.tarif}</td>
                <td className="px-4 py-3">
                  {rent.statut === "louee" && <span className="inline-block px-2 py-1 font-bold text-center text-yellow-500 rounded-md bg-yellow-500/50 w-28 ">Louée</span>}
                  {rent.statut === "disponible" && <span className="inline-block px-2 py-1 font-bold text-center text-green-900 rounded-md bg-green-500/50 w-28 ">Disponible</span>}
                  {rent.statut === "en_maintenance" && <span className="inline-block px-2 py-1 font-bold text-center text-red-700 rounded-md bg-red-500/50 w-28 ">Maintenance</span>}
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
