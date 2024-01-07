import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItems = () => {
    const {birdNameENG,birdNameBD,location,date,description,camera, _id} = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit,formState: { errors } } = useForm()
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });

    if (res.data.success) {
      const birdItem = {

        birdNameENG: data.birdNameENG,
        birdNameBD: data.birdNameBD,
        location: data.location,
        date: data.date,
        description: data.description,
        camera: data.camera,
        image: res.data.data.display_url,
        
      }
      // 
      const birdResult = await axiosPublic.patch(`/birds/${_id}`, birdItem);
      if(birdResult.data.modifiedCount > 0){
        // show success popup
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.birdNameENG} is updated to the menu.`,
            showConfirmButton: false,
            timer: 1500
          });
    }
    }
   
  };

  return (
    <div className="w-full mx-auto bg-white p-4 my-10 rounded-md shadow-xl md:w-4/5 lg:w-full xl:w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="form-control w-full ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span className="label-text">English Name of the Bird</span>
            </label>
            <input type="text" defaultValue={birdNameENG} placeholder="e.g. Kingfisher" {...register("birdNameENG", { required: true })} required
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />

          </div>
          <div className="form-control w-full ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span className="label-text">পাখিটির বাংলা নাম</span>
            </label>
            <input type="text" defaultValue={birdNameBD} placeholder="পাখিটির বাংলা নাম লিখুন ( যেমন: কাঠ শালিক )" {...register("birdNameBD", { required: true })} required
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />

          </div>

        </div>
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="form-control w-full ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span className="label-text">Location</span>
            </label>
            <input type="text" defaultValue={location} placeholder="e.g. Kaptai Lake, Rangamati" {...register("location", { required: true })} required
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />

          </div>
          <div className="form-control w-full ">
            <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">
              Date of Click
            </label>
            <input
              type="date"
              id="deadline"
              defaultValue={date}
              {...register('date')}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

          </div>
        </div>
        <div className="flex gap-6 mb-6">
          <div className="form-control w-full ">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description About the Bird
            </label>
            <textarea
              id="description"
              defaultValue={description}
              placeholder="Write a description about the bird . . . . ."
              {...register('description')}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="form-control w-full ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span className="label-text">Name of the Camera Setup</span>
            </label>
            <input type="text" defaultValue={camera} placeholder="Name of the Camera Setup" {...register("camera", { required: true })} required
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />

          </div>
          <div className="form-control w-full">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image of thr Bird
            </label>
            <input
              type="file"
              id="image"
              {...register('image', { required: true })}
              className="border rounded w-full py-[6px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
      <p className="text-teal-600 text-xs mt-1">
  ** Image must be required. Please choose your image.
  </p>
  {errors.image && (
    <p className="text-red-500 text-xs font-semibold mt-1">Image is required. Please choose your image.</p>
  )}
          </div>
        </div>

        <div className="flex justify-center">
        <button className="btn w-1/2 mt-10 bg-emerald-700 text-white hover:bg-emerald-950 hover:text-white">
          Update Item
        </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItems;
