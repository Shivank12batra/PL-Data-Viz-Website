import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, useTransition, animated } from 'react-spring';
import { FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import bgmImages from '../../data/animationContent';

const Home = ({navOpen, setNavOpen}) => {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [arrowVisible, setArrowVisible] = useState(true)
  const [backgroundObj, setBackgroundObj] = useState(bgmImages[0])
  const navigate = useNavigate()

  const arrowAnimation = useSpring({
    from: {opacity: 0},
    to: {opacity: arrowVisible ? 1 : 0},
    config: {duration: 2000}
  })

  const titleAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: headerVisible ? 1 : 0 },
    config: {duration: 2000}
  });

  const contentAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: contentVisible ? 1 : 0 },
    config: {duration: 1000} 
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: buttonVisible ? 1 : 0 },
    config: {duration : 1000}
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
        {backgroundObj.id !== 1 ? (
          <animated.button style={buttonAnimation} className={`${buttonVisible ? '' : 'opacity-0'} group text-white font-bold text-sm bg-black bg-opacity-70 px-4 py-2 my-2 hover:bg-red-500 transition-all duration-200`}
          onClick={() => navigate(backgroundObj.href)}>
            BROWSE SECTION
        </animated.button>
        )
        : 
        null}
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