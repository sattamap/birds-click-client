import { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

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

    <div className='max-w-7xl mx-auto my-20'>
    <h2 className="text-4xl font-bold font-poppin text-center mb-10">Top Tweets</h2>
    <h2 className="text-2xl text-center ">Save the Nature</h2>
    <div className="divider mb-10 font-freehand text-lg">Whispers in the Wind</div>
    <Swiper 
    spaceBetween={10}
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    pagination={{
      clickable: true,
    }}
    loop={true}
    breakpoints={{
      '@0.00': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '@0.75': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      '@1.50': {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    }}
    modules={[Autoplay,Pagination]}
    className="mySwiper mt-20"
    >
      {features.map(bird => (
        <SwiperSlide key={bird._id} className="relative overflow-hidden rounded-lg bg-base-100 shadow-xl">
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
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default Feature;
