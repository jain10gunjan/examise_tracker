import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Practicetestmainpage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

 

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/freetestapi`);
        setProducts(response.data);
        toast.success("Fetching..")
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

 
  console.log(products[0]?.topicname)

  const filterOptions = [
    { id: 'aptitude', label: 'aptitude' },
    { id: 'biology', label: 'Biology' },
  ];

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleCompanyChange = (company) => {
    // Check if the company is already selected
    if (selectedCompanies.includes(company)) {
      // If selected, remove it
      setSelectedCompanies((prevSelected) => prevSelected.filter((c) => c !== company));
    } else {
      // If not selected, add it
      setSelectedCompanies((prevSelected) => [...prevSelected, company]);
    }
  };



    useEffect(() => {
      // Filter products based on both selected companies and search term
      const updatedFilteredProducts = products.filter((product) => {
        const matchesCompany = selectedCompanies.length === 0 || selectedCompanies.includes(product.subject);
        const matchesSearch = ((product.subject +'Test No').toLowerCase()).includes(searchTerm.toLowerCase());
        // const matchesSearch = (
        //   product.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //   product.topicname.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        return matchesCompany && matchesSearch;

      });
  
      setFilteredProducts(updatedFilteredProducts);
    }, [searchTerm, selectedCompanies, products]);
  

  return (
    <div>
      <Navbar/>
      <section className="mt-20 bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">


                <button
                  id="filterDropdownButton"
                  onClick={toggleFilterDropdown}
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4 mr-2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Filter
                  <svg
                    className="-mr-1 ml-1.5 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>

                <div
                  id="filterDropdown"
                  className={`z-10 ${isFilterDropdownOpen ? 'block' : 'hidden'} w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
                >
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose Subject</h6>
                  <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                    {filterOptions.map((option) => (
                      <li key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          type="checkbox"
                          value=""
                          checked={selectedCompanies.includes(option.id)}
                          onChange={() => handleCompanyChange(option.id)}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label htmlFor={option.id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Test Name                    </th>
                    {/* <th scope="col" className="px-4 py-3">
                      Subject
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Attempted
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      
                      {/* <td className="px-4 py-3">{products[index]?.subject.toUpperCase()}</td> */}
<a href={`/freetest/${products[index]?.topicname}/10/${products[index]?._id}`}>
  <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-normal dark:text-white">
    {product.testname.toUpperCase()}<br/>
    {/* <p className='text-xs'>{products[index]?.topicname}</p> */}
  </th>
</a>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length > 0 ? 1 : 0}</span>
                -
                <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span>
                of
                <span className="font-semibold text-gray-900 dark:text-white">{products.length}</span>
              </span>
            </nav>
          </div>
        </div>
      </section>
      <Toaster/>
      <Footer/>
    </div>
  );
};

export default Practicetestmainpage;
