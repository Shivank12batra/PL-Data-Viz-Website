import {useState, useEffect} from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import { FaBars, FaTimes, 
  FaAngleLeft, FaAngleRight,
  FaGithub, FaTwitter, FaLinkedin
} from 'react-icons/fa';
import {MdOutlineKeyboardArrowRight} from 'react-icons/md';

import home_page from '../assets/Home_Page_2.jpg';
import home_page_3 from '../assets/home_page_3.jpg';
import player_stats from '../assets/player_stat.jpg';
import team_stats from '../assets/team_stats.jpg';
import pl_logo_new from '../assets/pl_logo_new.png';

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
      content: 'Providing macro-analysis and in depth-analysis related to the top tier teams. Shotmaps, passmaps, percentile stats for your team, how did your team fair up against the giants and what not. What is the exact usecase of this whole project wallahi, we cannot even compete.',
      src: team_stats,
    },
    {
      id: 3,
      header: 'PLAYER STATS',
      content: 'Get the most in-depth analysis of your favourite player that you can play around with and get to know him in depth so that he helps you back in the most greatest way possible. Its so over that you wouldnt even imagine but we are so back???',
      src: player_stats,
    },
    {
      id: 4,
      header: 'MATCHDAY',
      content: 'Its the matchday section! we get what we want and go ahead and build some really awesome stuff with just the matchday content that we have at oiur hands! cheer your team and get the latest updates of who was the match of the player and who fukced up the most! Wohoo let the party begin!',
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
      name: 'Glossary',
      href: '',
    },
  ]

  const mediaLinks = [
    {
      id: 1,
      icon: <FaGithub size={20}/>,
      href: ''
    },
    {
      id: 2,
      icon: <FaTwitter size={20}/>,
      href: ''
    },
    {
      id: 3,
      icon: <FaLinkedin size={20}/>,
      href: ''
    },
  ]

  const [navOpen, setNavOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [backgroundObj, setBackgroundObj] = useState(bgmImages[0])

  const titleAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: headerVisible ? 1 : 0 },
    config: {duration: 3000} // Wait for 2 seconds before animating
  });

  const contentAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: contentVisible ? 1 : 0 },
    config: {duration: 3000} // Wait for 4 seconds before animating
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: buttonVisible ? 1 : 0 },
    config: {duration : 2000} // Wait for 6 seconds before animating
  });

  const imgTransition = useTransition(backgroundObj, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 220, friction: 120 },
  });

  useEffect(() => {
    const headerFadeIn = setTimeout(() => {
      setHeaderVisible(true);
    }, 2000);
    const headerFadeOut = setTimeout(() => {
      setHeaderVisible(false);
    }, 13000);
    const contentFadeIn = setTimeout(() => {
      setContentVisible(true);
    }, 5000);
    const contentFadeOut = setTimeout(() => {
      setContentVisible(false);
    }, 12000);
    const buttonFadeIn = setTimeout(() => {
      setButtonVisible(true);
    }, 6500);
    const buttonFadeOut = setTimeout(() => {
      setButtonVisible(false);
    }, 12500);

  
    const bgTimer = setInterval(() => {
      const newId = (backgroundObj.id + 1) % bgmImages.length
      setBackgroundObj(bgmImages[newId]);
    }, 16000);
  
    return () => {
      console.log('clearing stuff')
      clearTimeout(headerFadeIn);
      clearTimeout(headerFadeOut);
      clearTimeout(contentFadeIn);
      clearTimeout(contentFadeOut);
      clearTimeout(buttonFadeIn);
      clearTimeout(buttonFadeOut);
      clearInterval(bgTimer);
    };
  }, [backgroundObj]);

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      {imgTransition((props, item) => {
        return (
        <animated.div style={{...props,
         position: "absolute",
         top:0,
         left:0,
         right:0,
         bottom:0,
          }}>
          <animated.img
            key={item.id}
            src={item.src}
            alt="Premier League Data Viz Website"
            className="w-full h-full object-cover"
          />
        </animated.div>)
      })}
      {/* title, content and button display */}
      {headerVisible ? 
      (<animated.h1 style={titleAnimation} key={backgroundObj.id} className='absolute top-16 left-1/2 transform -translate-x-1/2'><span className='text-white text-3xl font-bold inline-block bg-black px-6 py-4 text-center sm:text-5xl sm:px-20'>{backgroundObj.header}</span></animated.h1>) : null}
      <animated.div className='absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-0 ml-8'>
        <animated.button style={buttonAnimation} className={`${buttonVisible ? '' : 'invisible'} group text-white font-bold text-sm bg-black px-4 py-2 my-2 hover:bg-red-500 transition-all duration-200`}>
            BROWSE SECTION
            <span className='hidden align-middle pl-2 group-hover:inline-block'>
              <MdOutlineKeyboardArrowRight size={25}/>
            </span>
          </animated.button>
        <animated.p style={contentAnimation} className={`${contentVisible ? '' : 'invisible'} text-white text-sm bg-black max-w-md px-2 py-2 sm:text-lg`}>{backgroundObj.content}</animated.p>
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
        <button className="bg-gray-500 p-1 hover:bg-gray-300 transition-colors duration-300 sm:p-2">
          <FaAngleRight size={24} onClick={() => {
            backgroundObj.id === 4 ? setBackgroundObj(bgmImages[0]) : setBackgroundObj(bgmImages[backgroundObj.id])
            setHeaderVisible(false)
            setContentVisible(false)
            setButtonVisible(false)
          }}/>
        </button>
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 sm:left-6">
        <button className="bg-gray-400 p-1 hover:bg-gray-300 transition-colors duration-300 sm:p-2">
          <FaAngleLeft size={24}  onClick={() => {
            backgroundObj.id === 1 ? setBackgroundObj(bgmImages[bgmImages.length - 1]) : setBackgroundObj(bgmImages[backgroundObj.id - 2])
            setHeaderVisible(false)
            setContentVisible(false)
            setButtonVisible(false)
          }}/>
        </button>
      </div>
      {navOpen && (
        <div className='absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500'>
          <ul className='flex flex-col justify-center items-center mt-16 sm:mt-24'>
          {navItems.map(({id, name}) => {
              return <li key={id} className="px-4 cursor-pointer capitalize py-6 text-3xl hover:text-white">{name}</li>
            })}
          </ul>
          <ul className='flex flex-row justify-center items-center pl-0 mt-12'>
          {mediaLinks.map(({id, icon, href}) => {
              return <li key={id} className="px-4 cursor-pointer hover:text-white"><a href={href} target='_blank' className='text-decoration-none'>{icon}</a></li>
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home

// npx tailwindcss -i ./src/tailwind.css -o ./public/output.css --watch
