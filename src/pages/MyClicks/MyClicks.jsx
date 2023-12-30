import { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { CiCalendarDate } from 'react-icons/ci';
import { FaHeart, FaLocationDot } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import axios from 'axios';

const MyClicks = () => {
  const [birds, setBirds] = useState([]);
  const [lovedBirds, setLovedBirds] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [userIpAddress, setUserIpAddress] = useState('');

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

  return (
    <div className="max-w-screen-xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6">My Clicks are here:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {birds.map((bird) => (
          <div key={bird._id}  onClick={() => handleLoveClick(bird._id)} className="card card-compact w-96 h-5/6 bg-base-100 shadow-xl">
            <figure>
              <img src={bird?.image} alt={bird?.birdNameENG} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
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
                  {lovedBirds.includes(bird._id) ? <FaHeart color="red" /> : <CiHeart />}
                </div>
              <button className="btn btn-info">More About</button>
              
              </div>
              {/* <div className="card-actions justify-end">
               
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClicks;
