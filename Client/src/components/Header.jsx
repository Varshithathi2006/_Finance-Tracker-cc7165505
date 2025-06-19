import { Link } from 'react-router-dom';
// Import the image at the top
import bgPattern from '../assets/bg-pattern.jpg';

export default function Header() {
  return (
    <header 
      className="relative bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 shadow-lg bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-center text-3xl font-bold tracking-wide drop-shadow-lg">
          Financio
        </h1>
        <div className="flex justify-center gap-8 mt-4">
          <Link to="/about" className="hover:underline hover:text-yellow-200 transition-colors duration-200">
            About Us
          </Link>
          <Link to="/" className="hover:underline hover:text-yellow-200 transition-colors duration-200">
            Home
          </Link>
          <Link to="/signin" className="hover:underline hover:text-yellow-200 transition-colors duration-200">
            Sign In
          </Link>
          <Link to="/signup" className="hover:underline hover:text-yellow-200 transition-colors duration-200">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}