
import banner1 from "../../assets/birds_click_banner.jpg"
import Navbar from "../Navbar/Navbar";


const Banner = () => {
    return (
        <div>
            
            <div className="w-full bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${banner1})` }}>
            <Navbar></Navbar>  
              
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;