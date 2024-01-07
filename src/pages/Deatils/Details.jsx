import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Details = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    axiosPublic.get('/birds').then((response) => {
      setBirds(response.data);
    });
  }, [axiosPublic]);

  const birdDetails = birds.find((bird) => bird._id === id);

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col gap-6">
          <div className="lg:flex lg:gap-8">
            <img src={birdDetails?.image} className="w-full rounded-lg shadow-2xl" alt={birdDetails?.birdNameENG} />
            <div className="lg:w-2/3 mt-6 lg:mt-0">
              <h1 className="text-base font-medium mb-2 lg:mb-4">
                Name of the Bird <span className="lg:mr-2">:</span>
                <span className="text-lg font-bold block xl:inline ">{birdDetails?.birdNameENG} ({birdDetails?.birdNameBD})</span>
              </h1>
              <h1 className="text-base font-medium mb-2 lg:mb-4">
                Location <span className="lg:ml-16 lg:mr-2">:</span>
                <span className="text-lg font-bold block xl:inline">{birdDetails?.location}</span>
              </h1>
              <h1 className="text-base font-medium mb-2 lg:mb-4">
                Date <span className="lg:ml-24 lg:mr-2">:</span>
                <span className="text-lg font-bold block xl:inline">{birdDetails?.date}</span>
              </h1>
              <h1 className="text-base font-medium mb-2 lg:mb-4">
                Camera Setup <span className="lg:ml-4 lg:mr-2">:</span>
                <span className="text-lg font-bold block xl:inline">{birdDetails?.camera}</span>
              </h1>
              <p className="text-justify overflow-auto max-h-64">{birdDetails?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
