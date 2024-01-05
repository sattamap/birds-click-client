import { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Feature = () => {
  const [features, setFeatures] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get('/birds');
        console.log('Raw Response Data:', response.data);

        const filteredFeatures = response.data.filter(bird => bird.loveStatus > 1);
        console.log('Filtered Features:', filteredFeatures);

        console.log('Types of loveStatus:', filteredFeatures.map(bird => typeof bird.loveStatus));

        setFeatures(filteredFeatures);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {features.map(bird => (
        <div key={bird._id} className="relative overflow-hidden rounded-lg bg-base-100 shadow-xl">
          <img
            src={bird.image}
            alt={bird.birdNameENG}
            className="object-cover w-full h-72"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="p-4 bg-opacity-80 bg-base-700 w-full">
              <h2 className="text-xl font-bold text-white">{bird.birdNameENG}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;
