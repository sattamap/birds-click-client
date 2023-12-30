import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageItems = () => {
  const axiosPublic = useAxiosPublic();
  const [birds, setBirds] = useState([]);

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

//   const handleDelete = async (birdId) => {
//     try {
//       // Make the API request to delete the bird
//       await axiosPublic.delete(`/birds/${birdId}`);

//       // Update the local state to reflect the deletion
//       setBirds((prevBirds) => prevBirds.filter((bird) => bird._id !== birdId));
//     } catch (error) {
//       console.error('Error deleting bird:', error);
//     }
//   };
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
  
  

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
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
            {birds.map((bird, index) => (
              <tr key={bird._id}>
                <td>{index + 1}.</td>
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
                    <button className="btn btn-neutral btn-xs">Edit</button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
