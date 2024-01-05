
import { Link } from "react-router-dom";
import banner1 from "../../assets/birds_click_banner.jpg"
import Navbar from "../Navbar/Navbar";


const Banner = () => {
    return (
        <div>
            
            <div className="w-full bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${banner1})` }}>
            <Navbar></Navbar>  
              
                <div className="flex justify-end max-w-7xl mx-auto my-40 md:my-28 text-center text-white">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Avian Marvels in Pixels</h1>
                        <p className="mb-5">A Visual Expedition Through My Lens.</p>
                        <Link to="/myClicks"><button className="btn bg-teal-600 hover:bg-teal-900 hover:text-slate-200">Explore</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;