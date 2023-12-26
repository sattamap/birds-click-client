import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
//import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBirds = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset} = useForm()
    const onSubmit = async (data) =>{
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
        //   const formattedDate = selectedDate
        //   ? format(selectedDate, 'yyyy-MM-dd')
        //   : null;
            // now send the menu item data to the server with the image url
            const birdItem = {
              
                birdName: data.birdName,
                image: res.data.data.display_url
            }
            // 
            const birdResult = await axiosPublic.post('/birds', birdItem);
            console.log(birdResult.data)
            if(birdResult.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.birdName} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);
    };

    return (
        <div>
                      <form onSubmit={handleSubmit(onSubmit)}>
<div className="flex gap-6">
<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Name of the Bird</span>
  </label>
  <input type="text" placeholder="Name of the Bird" {...register("birdName" , {required: true})} required  className="input input-bordered w-full " />

</div>
{/* <div className="form-control w-full">
              <label className="label">
                <span className="label-text"> Date</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Date"
                className="input input-bordered w-full"
              />
            </div> */}
</div>
{/* <div className="flex gap-6">

<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Price</span>
  </label>
  <input type="text" placeholder="Price" {...register("price", {required: true})}  className="input input-bordered w-full " />

</div>


<div className="form-control w-full">
  <label className="label">
    <span className="label-text">Slots</span>
  </label>
  <input
    type="number"
    placeholder="Slots"
    {...register('slots', { required: true })}
    className="input input-bordered w-full"
  />
</div>

</div>
<div className="flex gap-6">

<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Sample Type</span>
  </label>
  <input type="text" placeholder="Sample Type" {...register("sampleType", {required: true})}  className="input input-bordered w-full " />

</div>


<div className="form-control w-full">
  <label className="label">
    <span className="label-text">Pre Test Information</span>
  </label>
  <input
    type="text"
    placeholder="Pre Test Info"
    {...register('preTestINfo', { required: true })}
    className="input input-bordered w-full"
  />
</div>

</div>
<div className="form-control">
  <label className="label">
    <span className="label-text"> Details</span>
  </label>
  <textarea {...register('details', {required: true})} className="textarea textarea-bordered h-24" placeholder="Details"></textarea>
 
</div> */}
<div className="form-control w-full my-6">
<input {...register('image')} type="file" className="file-input w-full max-w-xs" />
</div>
      
<button className="btn mt-10 bg-emerald-700 hover:bg-emerald-950 hover:text-white">
  Add Test
</button>
    </form>
        </div>
    );
};

export default AddBirds;
