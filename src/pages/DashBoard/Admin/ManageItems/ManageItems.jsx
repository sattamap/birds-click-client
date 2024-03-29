import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const axiosPublic = useAxiosPublic();
  const [birds, setBirds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await axiosPublic.get('/birds');
        setBirds(response.data);
      } catch (error) {
        console.error('Error fetching birds:', error);
      }
    };

    fetchBirds();
  }, [axiosPublic]);

  const handleDelete = async (bird) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/birds/${bird._id}`);
          console.log(res.data);

          if (res.status === 200) {
            // refetch to update the ui
            const updatedBirds = birds.filter((b) => b._id !== bird._id);
            setBirds(updatedBirds);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${bird.birdNameENG} has been deleted`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Handle the case where the bird was not deleted
            console.error("Error deleting bird:", res.data);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        } catch (error) {
          console.error("Error deleting bird:", error);
          // Handle the case where an error occurred during deletion
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = birds.slice(indexOfFirstItem, indexOfLastItem);

  const pages = Math.ceil(birds.length / itemsPerPage);
  const pageNumbers = [...Array(pages).keys()];

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pages - 1));
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  const renderPageNumbers = () => {
    const renderDots = (
      <li key="dots" className="">
        <span className="">...</span>
      </li>
    );

    const pageButtons = [];

    if (pages <= 2) {
      // Render all page numbers
      pageButtons.push(...pageNumbers.map(renderPageButton));
    } else {
      // Render 1st page
      pageButtons.push(renderPageButton(0));

      // Render dots if not on the first or last few pages
      if (currentPage > 1) {
        pageButtons.push(renderDots);
      }

      // Render current page and adjacent pages
      const start = Math.max(currentPage - 1, 1);
      const end = Math.min(currentPage + 1, pages - 1);

      for (let i = start; i <= end; i++) {
        pageButtons.push(renderPageButton(i));
      }

      // Render dots if not on the first or last few pages
      if (currentPage < pages - 2) {
        pageButtons.push(renderDots);
      }

      // Render last page if not on the last page
      if (currentPage < pages - 1) {
        // Check if the page before the last page is selected
        const isBeforeLastPage = currentPage === pages - 2;
        
        // Render the last page only if not before the last page
        if (!isBeforeLastPage) {
          pageButtons.push(renderPageButton(pages - 1));
        }
      }
    }

    return (
      <ul className="flex list-none items-center gap-2 mx-4">
        {pageButtons}
      </ul>
    );
  };

  const renderPageButton = (pageNumber) => (
    <li
      key={pageNumber}
      className={`pagination-item ${currentPage === pageNumber ? 'btn btn-xs sm:btn-sm md:btn-md bg-teal-950 text-white' : ''}`}
    >
      <button
        className="pagination-link"
        onClick={() => handlePageClick(pageNumber)}
      >
        {pageNumber + 1}
      </button>
    </li>
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name & Image</th>
              <th>Location & Date</th>
              <th>Camera Setup</th>
              <th>Total Reactions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((bird, index) => (
              <tr key={bird._id}>
                <td>{index + indexOfFirstItem + 1}.</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={bird?.image} alt={bird?.birdNameENG} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{bird?.birdNameENG}</div>
                      <div className="text-sm opacity-50">{bird?.birdNameBD}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {bird?.location}
                  <br />
                  <span className="badge badge-ghost badge-sm">{bird?.date}</span>
                </td>
                <td>{bird?.camera}</td>
                <td>
                  <p className="">{bird?.loveStatus}</p>
                </td>
                <th>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() => handleDelete(bird)}
                    >
                      Delete
                    </button>
                    <Link to={`/dashboard/updateItem/${bird._id}`}>
                      <button className="btn btn-neutral btn-xs">Edit</button>
                    </Link>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <nav className="flex flex-col sm:flex-row items-center justify-center mt-10">
  <select className="mb-4 sm:mb-0 mr-0 sm:mr-6 border border-solid border-teal-400 rounded-lg" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(e.target.value)}>
    <option value={5}>5 per page</option>
    <option value={10}>10 per page</option>
    {/* Add more options as needed */}
  </select>
  <div className="flex justify-center items-center">
    <button
      className="btn btn-xs sm:btn-sm md:btn-md btn-info mb-2 lg:mb-0 mr-2 lg:mx-1" // Adjusted margin here
      onClick={handlePrevClick}
      disabled={currentPage === 0}
    >
      Previous
    </button>
    <div className="flex items-center gap-2 -mt-2 lg:-mt-1"> {/* Wrapped the page numbers div with flex */}
      {renderPageNumbers()} {/* Render page numbers inside this div */}
    </div>
    <button
      className="btn btn-xs sm:btn-sm md:btn-md btn-info mb-2 lg:mb-0 ml-2 lg:mx-1" // Adjusted margin here
      onClick={handleNextClick}
      disabled={currentPage === pages - 1}
    >
      Next
    </button>
  </div>
</nav>


    </div>
  );
};

export default ManageItems;
