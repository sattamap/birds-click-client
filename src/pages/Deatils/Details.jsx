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
  <div className="hero-content flex-col lg:flex-row gap-14">
    <div className="">
    <img src={birdDetails?.image} className=" rounded-lg shadow-2xl" />
    </div>
    <div className="lg:w-2/5 ">
      <h1 className="text-base font-bold" >Name of the Bird <span className="ml-[14px]">:</span><span className="text-xl font-bold"> {birdDetails?.birdNameENG} ({birdDetails?.birdNameBD})</span> </h1>
      <h1 className="text-base font-bold " > Location <span className="ml-20">:</span>  <span className="text-xl font-bold">{birdDetails?.location} </span> </h1>
      <h1 className="text-base font-bold" > Date <span className="ml-[109px]">:</span> <span className="text-xl font-bold">{birdDetails?.date} </span> </h1>
      <h1 className="text-base font-bold" > Camera Setup <span className="ml-[40px]">:</span> <span className="text-xl font-bold">{birdDetails?.camera} </span> </h1>
      <p className="text-justify overflow-auto max-h-64 mt-16">{birdDetails?.description}</p>

    </div>
  </div>
</div>
        </div>
    );
};

export default Details;