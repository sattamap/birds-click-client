import { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const MyClicks = () => {
  const [birds, setBirds] = useState([]);
  const axiosPublic = useAxiosPublic();

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

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6">My Clicks are here:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {birds.map((bird) => (
               <div key={bird._id} className="card card-compact w-96 bg-base-100 shadow-xl">
               <figure><img src={bird?.image}  alt={bird?.birdNameENG} /></figure>
               <div className="card-body">
                <h2 className="card-title">{bird?.birdNameENG} ({bird?.birdNameBD})</h2>
                 <p> {bird?.date}  </p>
                   <p> {bird?.location} </p>
                 <div className="card-actions justify-end">
                   <button className="btn w-2/4 mx-auto btn-primary">More About</button>
                 </div>
               </div>
             </div>
        ))}
      </div>

 
    </div>
  );
};

export default MyClicks;
