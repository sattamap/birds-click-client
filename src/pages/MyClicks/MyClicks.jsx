import { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { CiCalendarDate } from 'react-icons/ci';
import { FaHeart, FaLocationDot } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyClicks = () => {
  const [birds, setBirds] = useState([]);
  const [lovedBirds, setLovedBirds] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [userIpAddress, setUserIpAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await axiosPublic.get('/birds');
        setBirds(response.data);
      } catch (error) {
        console.error('Error fetching birds:', error);
      }
    };

    // Fetch user's IP address from an external API (replace with your preferred method)
    axios.get('https://api64.ipify.org?format=json').then((response) => {
      setUserIpAddress(response.data.ip);
    });

    fetchBirds();
  }, [axiosPublic]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get('/birdsCount');
        setCount(response.data.count);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0); // Reset current page when changing items per page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = birds.slice(startIndex, endIndex);

  const filteredBirds = searchQuery
    ? paginatedItems.filter((bird) =>
        bird.birdNameENG.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : paginatedItems;

  return (
    <div className="max-w-screen-xl mx-auto my-10 ">
      <div className="max-w-screen-xl mx-auto my-10 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search birds..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded w-1/2  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
          {filteredBirds.map((bird) => (
            <div
              key={bird._id}
              onClick={() => handleLoveClick(bird._id)}
              className="card card-compact w-96 h-5/6 bg-base-100 shadow-xl"
            >
              <figure>
                <img src={bird?.image} alt={bird?.birdNameENG} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {bird?.birdNameENG} ( {bird?.birdNameBD} )
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CiCalendarDate />
                    <p> {bird?.date} </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLocationDot />
                    <p> {bird?.location} </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className="text-2xl cursor-pointer"
                    onClick={() => handleLoveClick(bird._id)}
                  >
                    {lovedBirds.includes(bird._id) ? (
                      <FaHeart color="red" />
                    ) : (
                      <CiHeart />
                    )}
                  </div>
                  <Link to={`/details/${bird._id}`}>
                    <button className="btn btn-xs btn-info">More About</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          className=" rounded-lg  px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
       <nav className="flex items-center justify-center mt-4">
  <ul className="flex list-none">
    <li>
      <button
        className="btn btn-info"
        onClick={() => handlePageChange(0)}
        disabled={currentPage === 0}
      >
        First
      </button>
    </li>
    <li>
      <button
        className="btn btn-info mx-2"
        onClick={handlePrevPage}
        disabled={currentPage === 0}
      >
        Previous
      </button>
    </li>
    {pages.map((page) => (
  <li key={page}>
    <button
      className={`btn ${currentPage === page ? 'bg-teal-950 text-white' : 'btn-info text-black'} mx-2`}
      onClick={() => handlePageChange(page)}
    >
      {page + 1}
    </button>
  </li>
))}

    <li>
      <button
        className="btn btn-info mx-2"
        onClick={handleNextPage}
        disabled={currentPage === pages.length - 1}
      >
        Next
      </button>
    </li>
    <li>
      <button
        className="btn btn-info"
        onClick={() => handlePageChange(pages.length - 1)}
        disabled={currentPage === pages.length - 1}
      >
        Last
      </button>
    </li>
  </ul>
</nav>

      </div>
    </div>
  );
};

export default MyClicks;
