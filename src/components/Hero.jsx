import { Link } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold max-md:text-4xl text-white text-accent-content">Discover Organic & Regional Products!</h1>
          <p className="py-6 text-2xl max-md:text-lg text-white text-accent-content">
            Explore our wide range of organic and regional products, available in Paris, Montreal, Berlin, Rome, and Casablanca.
          </p>
          <Link to="/shop" className="btn btn-wide border-0 bg-green-700 hover:bg-green-600 text-white">Start Shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero;