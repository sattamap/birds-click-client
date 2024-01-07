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

  const handleLoveClick = async (birdId) => {
    try {
      // Check if the bird is already loved by the current IP address
      if (!lovedBirds.includes(birdId)) {
        // Update the loveStatus on the server
        const response = await axiosPublic.post(`/birds/${birdId}`, { ipAddress: userIpAddress });

        console.log('Server Response:', response);

        if (response && response.data) {
          // Assuming your server responds with the updated loveCount
          const { loveCount } = response.data;

          if (loveCount !== undefined) {
            // Update the UI with the updated love count
            updateLoveCount(loveCount);

            // Update the local state to prevent duplicate loves in the same session
            setLovedBirds((prevLovedBirds) => [...prevLovedBirds, birdId]);
          } else {
            console.error('Love count is missing in the server response');
          }
        } else {
          console.error('Invalid response from the server');
        }
      }
    } catch (error) {
      console.error('Error updating love count:', error);
    }
  };

  const updateLoveCount = (count) => {
    // Update the UI to display the love count
    console.log('Updated love count:', count);
  };

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

    const renderPageNumbers = () => {
      const renderDots = (
        <span key="dots" className="text-lg mx-2">...</span>
      );
    
      const renderPageButton = (page) => (
        <button
          key={page}
          className={`btn btn-xs sm:btn-sm md:btn-md ${currentPage === page ? 'bg-teal-950 text-white' : 'btn-info text-black'} mb-2 lg:mb-0 mr-2 lg:mx-2`}
          onClick={() => handlePageChange(page)}
        >
          {page + 1}
        </button>
      );
    
      const pageButtons = [];
    
      if (numberOfPages <= 2) {
        // Render all page numbers
        pageButtons.push(...pages.map(renderPageButton));
      } else {
        // Render 1st page
        pageButtons.push(renderPageButton(0));
    
        // Render dots if not on the first or last few pages
        if (currentPage > 1) {
          pageButtons.push(renderDots);
        }
    
        // Render current page and adjacent pages
        const start = Math.max(currentPage - 1, 1);
        const end = Math.min(currentPage + 1, numberOfPages - 1);
    
        for (let i = start; i <= end; i++) {
          pageButtons.push(renderPageButton(i));
        }
    
        // Render dots if not on the first or last few pages
        if (currentPage < numberOfPages - 2) {
          pageButtons.push(renderDots);
        }
    
        // Render last page if not on the last page
        if (currentPage < numberOfPages - 1) {
          // Check if the page before the last page is selected
          const isBeforeLastPage = currentPage === numberOfPages - 2;
          
          // Render the last page only if not before the last page
          if (!isBeforeLastPage) {
            pageButtons.push(renderPageButton(numberOfPages - 1));
          }
        }
      }
    
      return (
        <ul className="flex list-none">
          {/* <li>
            <button
              className="btn btn-xs sm:btn-sm md:btn-md btn-info mb-2 lg:mb-0 mr-2 lg:mr-2"
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
            >
              First
            </button>
          </li> */}
          <li>
            <button
              className="btn btn-xs sm:btn-sm md:btn-md btn-info mb-2 lg:mb-0 mr-2 lg:mx-2"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>
          </li>
          {pageButtons.map((button, index) => (
            <li key={index}>
              {button}
            </li>
          ))}
          <li>
            <button
              className="btn btn-xs sm:btn-sm md:btn-md btn-info mb-2 lg:mb-0 mr-2 lg:mx-2"
              onClick={handleNextPage}
              disabled={currentPage === numberOfPages - 1}
            >
              Next
            </button>
          </li>
          {/* <li>
            <button
              className="btn btn-xs sm:btn-sm md:btn-md btn-info mb-2 lg:mb-0 lg:mx-2"
              onClick={() => handlePageChange(numberOfPages - 1)}
              disabled={currentPage === numberOfPages - 1}
            >
              Last
            </button>
          </li> */}
        </ul>
      );
    };
    
    
    

  return (
    <div className="max-w-screen-xl mx-auto mt-10 ">
      <div className="max-w-screen-xl mx-auto my-10 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search birds..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded w-1/2  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
      </div>
      <div className='flex justify-center'>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto">
          {filteredBirds.map((bird) => (
            <div
              key={bird._id}
              onClick={() => handleLoveClick(bird._id)}
              className="card card-compact w-80 md:w-96 h-5/6 bg-base-100 shadow-xl"
            >
              <figure>
                <img src={bird?.image} alt={bird?.birdNameENG} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-sm lg:text-lg">
                  {bird?.birdNameENG} ( {bird?.birdNameBD} )
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CiCalendarDate></CiCalendarDate>
                    <p> {bird?.date} </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLocationDot></FaLocationDot>
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
                  <Link to={`/details/${bird._id}`}><button className="btn btn-xs btn-info">More About</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center mt-6 py-6">
        <div className="mb-4 lg:-mb-4">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            className="mr-6 p-2 lg:p-3 border border-solid border-teal-400 rounded-lg"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
        <nav className="flex flex-col lg:flex-row items-center justify-center mt-4">
          {renderPageNumbers()}
        </nav>
      </div>
    </div>
  );
};

export default MyClicks;



// import { useState, useEffect } from 'react';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import { CiCalendarDate } from 'react-icons/ci';
// import { FaHeart, FaLocationDot } from 'react-icons/fa6';
// import { CiHeart } from 'react-icons/ci';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const MyClicks = () => {
//   const [birds, setBirds] = useState([]);
//   const [lovedBirds, setLovedBirds] = useState([]);
//   const axiosPublic = useAxiosPublic();
//   const [userIpAddress, setUserIpAddress] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const fetchBirds = async () => {
//       try {
//         const response = await axiosPublic.get('/birds');
//         setBirds(response.data);
//       } catch (error) {
//         console.error('Error fetching birds:', error);
//       }
//     };

//     // Fetch user's IP address from an external API (replace with your preferred method)
//     axios.get('https://api64.ipify.org?format=json').then((response) => {
//       setUserIpAddress(response.data.ip);
//     });

//     fetchBirds();
//   }, [axiosPublic]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosPublic.get('/birdsCount');
//         setCount(response.data.count);
//       } catch (error) {
//         console.error('Error fetching product count:', error);
//       }
//     };

//     fetchData();
//   }, [axiosPublic]);

//   const numberOfPages = Math.ceil(count / itemsPerPage);
//   const pages = [...Array(numberOfPages).keys()];

//   const handleItemsPerPage = (e) => {
//     const val = parseInt(e.target.value);
//     setItemsPerPage(val);
//     setCurrentPage(0); // Reset current page when changing items per page
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedItems = birds.slice(startIndex, endIndex);

//   const filteredBirds = searchQuery
//     ? paginatedItems.filter((bird) =>
//         bird.birdNameENG.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : paginatedItems;

//   return (
//     <div className="max-w-screen-xl mx-auto my-10 ">
//       <div className="max-w-screen-xl mx-auto my-10 flex items-center justify-center">
//         <input
//           type="text"
//           placeholder="Search birds..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border rounded w-1/2  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
//         />
//       </div>
//       <div className="flex justify-center">
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
//           {filteredBirds.map((bird) => (
//             <div
//               key={bird._id}
//               onClick={() => handleLoveClick(bird._id)}
//               className="card card-compact w-96 h-5/6 bg-base-100 shadow-xl"
//             >
//               <figure>
//                 <img src={bird?.image} alt={bird?.birdNameENG} />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">
//                   {bird?.birdNameENG} ( {bird?.birdNameBD} )
//                 </h2>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <CiCalendarDate />
//                     <p> {bird?.date} </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FaLocationDot />
//                     <p> {bird?.location} </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div
//                     className="text-2xl cursor-pointer"
//                     onClick={() => handleLoveClick(bird._id)}
//                   >
//                     {lovedBirds.includes(bird._id) ? (
//                       <FaHeart color="red" />
//                     ) : (
//                       <CiHeart />
//                     )}
//                   </div>
//                   <Link to={`/details/${bird._id}`}>
//                     <button className="btn btn-xs btn-info">More About</button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <select
//           value={itemsPerPage}
//           onChange={handleItemsPerPage}
//           className=" rounded-lg  px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
//         >
//           <option value={5}>5 per page</option>
//           <option value={10}>10 per page</option>
//           <option value={20}>20 per page</option>
//         </select>
//        <nav className="flex items-center justify-center mt-4">
//   <ul className="flex list-none">
//     <li>
//       <button
//         className="btn btn-info"
//         onClick={() => handlePageChange(0)}
//         disabled={currentPage === 0}
//       >
//         First
//       </button>
//     </li>
//     <li>
//       <button
//         className="btn btn-info mx-2"
//         onClick={handlePrevPage}
//         disabled={currentPage === 0}
//       >
//         Previous
//       </button>
//     </li>
//     {pages.map((page) => (
//   <li key={page}>
//     <button
//       className={`btn ${currentPage === page ? 'bg-teal-950 text-white' : 'btn-info text-black'} mx-2`}
//       onClick={() => handlePageChange(page)}
//     >
//       {page + 1}
//     </button>
//   </li>
// ))}

//     <li>
//       <button
//         className="btn btn-info mx-2"
//         onClick={handleNextPage}
//         disabled={currentPage === pages.length - 1}
//       >
//         Next
//       </button>
//     </li>
//     <li>
//       <button
//         className="btn btn-info"
//         onClick={() => handlePageChange(pages.length - 1)}
//         disabled={currentPage === pages.length - 1}
//       >
//         Last
//       </button>
//     </li>
//   </ul>
// </nav>

//       </div>
//     </div>
//   );
// };

// export default MyClicks;

