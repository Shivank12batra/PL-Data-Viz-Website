import {useState, useEffect} from 'react';
import { useSpring, animated } from 'react-spring';
import { FaBars, FaTimes, FaAngleLeft, FaAngleRight, FaBackspace } from 'react-icons/fa';
import {MdOutlineKeyboardArrowRight} from 'react-icons/md';

import home_page from '../assets/Home_Page_2.jpg';
import home_page_3 from '../assets/home_page_3.jpg';
import player_stats from '../assets/player_stat.jpg';
import team_stats from '../assets/team_stats.jpg';
import pl_logo from '../assets/pl_logo.jpg';
import pl_logo_new from '../assets/pl_logo_new.png'

const Home = () => {
  const bgmImages = [
    {
      id: 1,
      header: 'EPL ANALYTICS',
      content: 'Welcome to the English Premier League Data Analytics Website, a place where you get the advanced analytics coverage of the traditional top teams in the form of interactive and detailed data visualizations. Now, even fans have access to detailed and advance analytics but in an easily digestable manner!',
      src: home_page,
    },
    {
      id: 2,
      header: 'TEAM STATS',
      content: 'Welcome to the English Premier League Data Analytics Website, a place where you get the advanced analytics coverage of the traditional top teams in the form of interactive and detailed data visualizations. Now, even fans have access to detailed and advance analytics but in an easily digestable manner!',
      src: team_stats,
    },
    {
      id: 3,
      header: 'PLAYER STATS',
      content: 'Welcome to the English Premier League Data Analytics Website, a place where you get the advanced analytics coverage of the traditional top teams in the form of interactive and detailed data visualizations. Now, even fans have access to detailed and advance analytics but in an easily digestable manner!',
      src: player_stats,
    },
    {
      id: 4,
      header: 'MATCHDAY',
      content: 'Welcome to the English Premier League Data Analytics Website, a place where you get the advanced analytics coverage of the traditional top teams in the form of interactive and detailed data visualizations. Now, even fans have access to detailed and advance analytics but in an easily digestable manner!',
      src: home_page_3,
    },
  ]
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
      name: 'Buy Me A Coffee',
      href: '',
    },
  ]

  // Define the animations for each element using the useSpring hook
  const titleAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 4000,
    config: {duration: 4000} // Wait for 2 seconds before animating
  });

  const contentAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 4000,
    config: {duration: 4000} // Wait for 4 seconds before animating
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 6000,
    config: {duration : 2000} // Wait for 6 seconds before animating
  });
  

  const [navOpen, setNavOpen] = useState(false)
  const [backgroundObj, setBackgroundObj] = useState(bgmImages[0])

  useEffect(() => {
    console.log(backgroundObj)
    const intervalId = setInterval(() => {
      backgroundObj.id === 4 ? setBackgroundObj(bgmImages[0]) : setBackgroundObj(bgmImages[backgroundObj.id])
    }, 20000)
    return () => clearInterval(intervalId)
  }, [backgroundObj])

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-11">
        <img
          src={backgroundObj.src}
          alt="Premier League Data Viz Website"
          className="w-full h-full object-cover"
        />
      </div>
      {/* title */}
      {/* Render animated content */}
      <animated.h1 style={titleAnimation} className='absolute top-16 left-1/2 transform -translate-x-1/2'><span className='text-white text-3xl font-bold inline-block bg-black px-20 py-4 text-center sm:text-5xl z-10'>{backgroundObj.header}</span></animated.h1>
        <animated.div className='absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-0 ml-8'>
          <button className='group text-white font-bold text-sm bg-black px-4 py-2 my-2 hover:bg-red-500 hover:shadow-lg hover:-translate-x-1 transition-all duration-200'>
            BROWSE SECTION
            <span className='hidden align-middle ml-2 group-hover:inline-block'>
              <MdOutlineKeyboardArrowRight size={25}/>
            </span>
          </button>
          <animated.p className='text-white text-sm bg-black max-w-md px-2 py-2 sm:text-lg'>{backgroundObj.content}</animated.p>
        </animated.div>
      {/* Logo */}
      <div className="absolute top-2 left-0 z-10 sm:left-24 sm:top-12 cursor-pointer">
        <img
          src={pl_logo_new}
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
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 sm:right-6">
        <button className="bg-gray-500 p-2 hover:bg-gray-300 transition-colors duration-300">
          <FaAngleRight size={24} onClick={() => {
            backgroundObj.id === 4 ? setBackgroundObj(bgmImages[0]) : setBackgroundObj(bgmImages[backgroundObj.id])
          }}/>
        </button>
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 sm:left-6">
        <button className="bg-gray-400 p-2 hover:bg-gray-300 transition-colors duration-300">
          <FaAngleLeft size={24}  onClick={() => {
            backgroundObj.id === 1 ? setBackgroundObj(bgmImages[bgmImages.length - 1]) : setBackgroundObj(bgmImages[backgroundObj.id - 2])
          }}/>
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

