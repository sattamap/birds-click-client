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
    // You can perform additional logic when itemsPerPage changes, e.g., fetch data with the new itemsPerPage
  };

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

        {/* Pagination */}
        <nav className="flex justify-center mt-10">
        <select className="mr-6 border border-solid border-teal-400 rounded-lg" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(e.target.value)}>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        {/* Add more options as needed */}
      </select>
          <button
            className="btn btn-sm btn-info"
            onClick={handlePrevClick}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <ul className="flex list-none gap-10 mx-8 ">
            {pageNumbers.map((pageNumber) => (
              <li
                key={pageNumber}
                className={`pagination-item ${currentPage === pageNumber ? 'btn btn-sm bg-teal-950 text-white' : ''}`}
              >
                <button
                  className="pagination-link"
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber + 1}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-sm btn-info"
            onClick={handleNextClick}
            disabled={currentPage === pages - 1}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ManageItems;
