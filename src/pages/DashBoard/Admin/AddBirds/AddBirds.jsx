import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBirds = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm()
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
        loveStatus: 0,
      }
      // 
      const birdResult = await axiosPublic.post('/birds', birdItem);
      console.log(birdResult.data)
      if (birdResult.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.birdNameENG} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    console.log('with image url', res.data);
  };

  return (
    <div className="w-4/5 mx-auto bg-white p-8 my-10 rounded-md shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-6 mb-6">
          <div className="form-control w-full ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span className="label-text">English Name of the Bird</span>
            </label>
            <input type="text" placeholder="e.g. Kingfisher" {...register("birdNameENG", { required: true })} required
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />

          </div>
          <div className="form-control w-full ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span className="label-text">পাখিটির বাংলা নাম</span>
            </label>
            <input type="text" placeholder="পাখিটির বাংলা নাম লিখুন ( যেমন: কাঠ শালিক )" {...register("birdNameBD", { required: true })} required
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />

          </div>

        </div>
        <div className="flex gap-6 mb-6">
          <div className="form-control w-full ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span className="label-text">Location</span>
            </label>
            <input type="text" placeholder="e.g. Kaptai Lake, Rangamati" {...register("location", { required: true })} required
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
              placeholder="Write a description about the bird . . . . ."
              {...register('description')}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

        </div>

        <div className="flex gap-6">
          <div className="form-control w-full ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <span className="label-text">Name of the Camera Setup</span>
            </label>
            <input type="text" placeholder="Name of the Camera Setup" {...register("camera", { required: true })} required
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
          </div>
        </div>

        <button className="btn mt-10 bg-emerald-700 hover:bg-emerald-950 hover:text-white">
          Add Bird
        </button>
      </form>
    </div>
  );
};

export default AddBirds;
