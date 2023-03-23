import {useState} from 'react';
import { FaBars, FaTimes, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import home_page from '../assets/Home_Page_2.jpg';
import pl_logo from '../assets/pl_logo.jpg';

const Home = () => {
  const [navOpen, setNavOpen] = useState(false)

  const navItems = [
    {
      id : 1,
      name: 'Home',
      href: '',
    },
    {
      id : 2,
      name: 'Team Stats',
      href: '',
    },
    {
      id : 3,
      name: 'Player Stats',
      href: '',
    },
    {
      id : 4,
      name: 'Matchday',
      href: '',
    },
    {
      id : 5,
      name: 'Login',
      href: '',
    },
    {
      id : 6,
      name: 'Buy Me A Coffee',
      href: '',
    },
  ]
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={home_page}
          alt="Premier League Data Viz Website"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo */}
      <div className="absolute top-2 left-0 z-10 sm:left-24 sm:top-12 cursor-pointer">
        <img
          src={pl_logo}
          alt="Premier League Logo"
          className="w-20 text-6xl"
        />
      </div>
 
      {/* Menu Button */}
      <div className="absolute top-2 right-0 z-10 sm:right-24 sm:top-12" onClick={() => setNavOpen(!navOpen)}>
        <button className="p-2 text-white bg-gray-900 rounded-md hover:bg-gray-800">
          {navOpen ? <FaTimes size={20}/> : <FaBars size={20}/>}

        </button>
      </div>
      {/* image slide button */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
        <button className="bg-gray-400 rounded-full p-2 hover:bg-gray-300 transition-colors duration-300">
          <FaAngleRight size={24} />
        </button>
      </div>
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
        <button className="bg-gray-400 rounded-full p-2 hover:bg-gray-300 transition-colors duration-300">
          <FaAngleLeft size={24} />
        </button>
      </div>
      {navOpen && (
          <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500'>
              {navItems.map(({id, name}) => {
                return <li key={id} className="px-4 cursor-pointer capitalize py-6 text-3xl hover:text-white">{name}</li>
              })}
          </ul>
        )}
    </div>
  );
};

export default Home
