
import { Link } from "react-router-dom";
import banner1 from "../../assets/birds_click_banner.jpg"
import Navbar from "../Navbar/Navbar";
import Typewriter from 'typewriter-effect';


const Banner = () => {
    return (
        <div>
            
            <div className="w-full bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${banner1})` }}>
            <Navbar></Navbar>  
              
                <div className="flex justify-end max-w-7xl mx-auto my-40 md:my-28 text-center text-white">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Avian Marvels in Pixels</h1>
                      <div className="flex gap-1 justify-center">
                      <p className="mb-5">A Visual 
                       </p>
                       <Typewriter
                               options={{
                                   strings: ['Expedition Through My Lens.','Tale of Wings in Focus.','Flight into Nature.'],
                                   autoStart: true,
                                   loop: true,
                               }}
                           /> 
                      </div>
                        <Link to="/myClicks"><button className="btn bg-teal-600 hover:bg-teal-900 hover:text-slate-200">Explore</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;