import {useState, useEffect} from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import { FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import {MdOutlineKeyboardArrowRight} from 'react-icons/md';
import NavBar from './NavBar';

import home_page from '../assets/home_page.png';
import team_stats from '../assets/team_stats.png';
import player_stats from '../assets/player_stats.png';
import matchday from '../assets/matchday.png';
import glossary from '../assets/glossary.png';

const Home = ({navOpen, setNavOpen}) => {
  const bgmImages = [
    {
      id: 1,
      header: 'EPL ANALYTICS',
      content: 'Your ultimate source for in-depth analysis of the English Premier League. Get access to comprehensive statistics, player and team performance metrics, and expert insights to stay ahead of the game. Perfect for passionate fans who want to deepen their knowledge and understanding of the sport!',
      src: home_page,
    },
    {
      id: 2,
      header: 'TEAM STATS',
      content: "Get the inside scoop on your favorite teams with our Team Stats section. Our interactive visualizations like pass networks, shot maps, and more, give you comprehensive insights into team performance. Get ready to geek out on data and take your fandom to the next level!",
      src: team_stats,
    },
    {
      id: 3,
      header: 'PLAYER STATS',
      content: "Have you ever wondered what makes your favorite players stand out on the field? Our Player Stats section is your one-stop-shop for in-depth insights and comprehensive statistics on each player's performance. From pinpoint passing to clutch goals, find out what makes your favourite player special!",
      src: player_stats,
    },
    {
      id: 4,
      header: 'MATCHDAY',
      content: 'Get exclusive access to the latest match insights with our Matchday section. From the standout performers to the crucial moments of the game, our detailed visualizations bring you closer to the action than ever before. Experience the thrill of matchday like never before',
      src: matchday,
    },
    {
      id: 5,
      header: 'GLOSSARY',
      content: "This section serves as a comprehensive guide to help you understand the key analytic terms used in our website. Whether you're a seasoned fan or new to the game, our glossary is the perfect reference tool to gain a deeper understanding of the analytics behind the sport.",
      src: glossary,
    },
  ]

  const [headerVisible, setHeaderVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [arrowVisible, setArrowVisible] = useState(true)
  const [backgroundObj, setBackgroundObj] = useState(bgmImages[0])

  const arrowAnimation = useSpring({
    from: {opacity: 0},
    to: {opacity: arrowVisible ? 1 : 0},
    config: {duration: 2000}
  })

  const titleAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: headerVisible ? 1 : 0 },
    config: {duration: 2000} // Wait for 2 seconds before animating
  });

  const contentAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: contentVisible ? 1 : 0 },
    config: {duration: 1000} // Wait for 4 seconds before animating
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: buttonVisible ? 1 : 0 },
    config: {duration : 1000} // Wait for 6 seconds before animating
  });

  const imgTransition = useTransition(backgroundObj, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 100, friction: 100 },
  });

  useEffect(() => {
    const headerFadeIn = setTimeout(() => {
      setHeaderVisible(true);
    }, 4000);
    const headerFadeOut = setTimeout(() => {
      setHeaderVisible(false);
    }, 15000);
    const contentFadeIn = setTimeout(() => {
      setContentVisible(true);
    }, 5000);
    const contentFadeOut = setTimeout(() => {
      setContentVisible(false);
    }, 15000);
    const buttonFadeIn = setTimeout(() => {
      setButtonVisible(true);
    }, 6500);
    const buttonFadeOut = setTimeout(() => {
      setButtonVisible(false);
    }, 15000);
    const arrowsFadeOut = setTimeout(() => {
      setArrowVisible(false);
    }, 4000);

  
    const bgTimer = setInterval(() => {
      backgroundObj.id === bgmImages[bgmImages.length - 1].id ? setBackgroundObj(bgmImages[0]) : setBackgroundObj(bgmImages[backgroundObj.id])
      setArrowVisible(true)
    }, 20000);
  
    return () => {
      console.log('clearing stuff')
      clearTimeout(headerFadeIn);
      clearTimeout(arrowsFadeOut);
      clearTimeout(headerFadeOut);
      clearTimeout(contentFadeIn);
      clearTimeout(contentFadeOut);
      clearTimeout(buttonFadeIn);
      clearTimeout(buttonFadeOut);
      clearInterval(bgTimer);
    };
  }, [backgroundObj]);

  return (
    <div className="relative h-screen z-0">
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
      <animated.h1 style={titleAnimation} key={backgroundObj.id} className={`${headerVisible ? '' : 'opacity-0'} absolute top-16 left-1/2 transform -translate-x-1/2`}><span className='text-white text-3xl font-bold inline-block bg-black bg-opacity-70 px-6 py-4 text-center sm:text-5xl sm:px-20'>{backgroundObj.header}</span></animated.h1>
      {/* description content and button */}
      <animated.div className='absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 ml-8'>
        <animated.button style={buttonAnimation} className={`${buttonVisible ? '' : 'opacity-0'} group text-white font-bold text-sm bg-black bg-opacity-70 px-4 py-2 my-2 hover:bg-red-500 transition-all duration-200`}>
          {backgroundObj.id === 1 ? 'LOGIN/SIGNUP' : 'BROWSE SECTION'}
            <span className='hidden align-middle pl-2 group-hover:inline-block'>
              <MdOutlineKeyboardArrowRight size={25}/>
            </span>
        </animated.button>
        <animated.p style={contentAnimation} className={`${contentVisible ? '' : 'opacity-0'} text-white text-sm bg-black bg-opacity-70 max-w-md px-2 py-2 sm:text-lg z-0`}>{backgroundObj.content}
        </animated.p>
      </animated.div>

      {/* image slide button */}
      <animated.div className="absolute right-0 top-1/2 transform -translate-y-1/2 sm:right-6">
        <animated.button style={arrowAnimation} className={`${arrowVisible ? '' : 'hidden'} bg-gray-500 bg-opacity-50 p-1 hover:bg-gray-300 transition-colors duration-300 sm:p-2`}>
          <FaAngleRight size={22} onClick={() => {
            setHeaderVisible(false)
            setContentVisible(false)
            setButtonVisible(false)
            backgroundObj.id === bgmImages[bgmImages.length - 1].id ? setBackgroundObj(bgmImages[0]) : setBackgroundObj(bgmImages[backgroundObj.id])
          }}/>
        </animated.button>
      </animated.div>
      <animated.div className="absolute left-0 top-1/2 transform -translate-y-1/2 sm:left-6">
        <animated.button style={arrowAnimation} className={`${arrowVisible ? '' : 'hidden'} bg-gray-500 bg-opacity-50 p-1 hover:bg-gray-300 transition-colors duration-300 sm:p-2`}>
          <FaAngleLeft size={22}  onClick={() => {
            setHeaderVisible(false)
            setContentVisible(false)
            setButtonVisible(false)
            backgroundObj.id === 1 ? setBackgroundObj(bgmImages[bgmImages.length - 1]) : setBackgroundObj(bgmImages[backgroundObj.id - 2])
          }}/>
        </animated.button>
      </animated.div>
      <NavBar navOpen={navOpen} setNavOpen={setNavOpen}/>
    </div>
  );
};

export default Home

// npx tailwindcss -i ./src/tailwind.css -o ./public/output.css --watch