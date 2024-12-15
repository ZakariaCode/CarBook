import React,{useState,useEffect} from 'react'
import image from '../assets/basil.jpg'
import {MdEdit} from 'react-icons/md'
import {listClient,updateClient} from '../services/ClientService'

export default function Customers() {
  const [clients, setClients]=useState([]);
    useEffect(()=>{
      listClient().then((response)=>{
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
  const [editCustomer, setEditCustomer] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customer, setCustomer] = useState({
      nom:"",
      email:"",
      password:"",
      adresse:"",
      ville:"",
      cin:"",
    });
  const EditCustomer = (selectedCustomerId) => {
    setSelectedCustomerId(selectedCustomerId);
    const customerToEdit=records.find((car)=>car.id===selectedCustomerId);
    setCustomer(customerToEdit);
    setEditCustomer(true); 
  };

  const closeEditCustomer = () => {
    setEditCustomer(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitEditCustomer= (e)=>{
      e.preventDefault();
      updateClient(selectedCustomerId,customer).then((response)=>{
        console.log(response.data);
      })
      setEditCustomer(false);
      window.location.reload(); 
    };

  return (
    <div className="dark:bg-[#121212] bg-white px-4 py-3 rounded-2xl border border-gray-200 flex flex-col mt-10 lg:mx-10 w-screen-short ">
      <div className='flex flex-col sm:flex-row  items-center justify-between my-4 mx-4'>
      <strong className="text-gray-700 dark:text-white text-xl my-3 mx-5 ">Customers</strong>
      
      {editCustomer && selectedCustomerId &&(
                      <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
                      {records.filter((cl) => cl.id === selectedCustomerId).map((cl) => (
                      <div className="bg-white p-6 rounded-md shadow-md w-96 border border-b-gray-200" key={cl.id}>                        <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-white">Edit Customer</h2>
                        <form onSubmit={submitEditCustomer}>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                              Name
                            </label>
                            <input
                              type="text"
                              name="nom"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter name"
                              value={customer.nom}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                              Email
                            </label>
                            <input
                              type="text"
                              name="email"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter email"
                              value={customer.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                              CIN
                            </label>
                            <input
                              type="text"
                              name="cin"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter Cin"
                              value={customer.cin}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                              Adresse
                            </label>
                            <input
                              type="text"
                              name="adresse"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter adresse"
                              value={customer.adresse}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-500">
                             Ville
                            </label>
                            <input
                              type="text"
                              name="ville"
                              className="dark:bg-neutral-800 bg-neutral-100 w-full mt-1 p-2 border rounded-md focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter ville"
                              value={customer.ville}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              onClick={closeEditCustomer}
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
          <thead className="border-b truncate mb-7 text-gray-500">
            <tr >
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3 ">Email</th>
              <th className="px-4 py-3">Cin</th>
              <th className="px-4 py-3">Adress</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="border-b truncate mb-7 text-gray-500 dark:text-gray-100 divide-y divide-slate-100">
            {records.map((client) => (
              <tr key={client.id} className="hover:bg-[#fff4ea] dark:hover:bg-[#282019]">
                <td className="px-4 py-3 flex gap-4 items-center font-bold text-gray-500 dark:text-gray-100">
                  <div className='h-11 w-11 rounded-2xl bg-sky-500 bg-cover bg-center ' style={{ backgroundImage: `url(${image})` }}></div>
                    {client.nom}
                  
                </td>
                <td className="px-4 py-3 font-bold">{client.email}</td>
                <td className="px-4 py-3">{client.cin}</td>
                <td className="px-4 py-3">{client.adresse}</td>
                <td className="px-4 py-3">{client.ville}</td>
                <td className="px-4 py-3">
                  <div className='flex flex-row gap-2 text-xl'>
                    <button className='text-sky-700' onClick={() =>EditCustomer(client.id)}>
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
