import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, 
    FaGithub, FaTwitter, FaLinkedin
  } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import pl_logo from '../assets/pl_logo.png';

const NavBar = ({navOpen, setNavOpen}) => {
    const {currentUser} = useAuth()

    const navItems = [
        { 
          id : 1,
          name: 'Home',
          href: '/',
        },
        {
          id : 2,
          name: 'Team Stats',
          href: '/team-stats',
        },
        {
          id : 3,
          name: 'Player Stats',
          href: '/player-stats',
        },
        {
          id : 4,
          name: 'Matchday',
          href: '/matchday',
        },
        {
          id : 5,
          name: 'Glossary',
          href: '/glossary',
        },
        {
          id : 6,
          name: 'Login',
          href: '/login',
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

  return (
    <div>
        <div className={`${navOpen ? 'fixed' : 'absolute'} top-2 left-0 z-10 sm:left-24 sm:top-12 cursor-pointer`}>
            <img
                src={pl_logo} 
                alt="Premier League Logo"
                className="w-20 text-6xl"
            />
        </div>

        {/* Menu Button */}
        <div className={`${navOpen ? 'fixed' : 'absolute'} top-2 right-0 z-10 sm:right-24 sm:top-12`} onClick={() => setNavOpen(!navOpen)}>
          <button className={`p-2 text-white rounded-md bg-black transition-all duration-500
          ease-in-out {${!navOpen ? 'bg-black' : ''}}`} onClick={() => setNavOpen(!navOpen)}>
            <span>
              {navOpen ? <FaTimes className='transition-all duration-500 ease-in-out' size={20}/> : <FaBars className='transition-all duration-500 ease-in-out' size={25}/>}
            </span>
          </button>
        </div>

        {/* nav contents */}
        {navOpen && (
            <div className={`fixed inset-0 w-full h-full bg-gradient-to-b from-black to-gray-800 text-gray-500 z-11 transform transition-transform duration-300 overflow-y-auto`}>
              <ul className='flex flex-col justify-center items-center mt-16'>
              {navItems.map(({id, name, href}) => {
                  return (
                  <li key={id} className='px-4 cursor-pointer capitalize py-6 text-3xl hover:text-white'>
                      <NavLink onClick={() => setNavOpen(!navOpen)} className={({isActive}) => isActive ? "text-white": ""} to={currentUser && id === navItems.length ? '/logout' : href}>{currentUser && id === navItems.length ? 'logout' : name}</NavLink>
                  </li>
                  );
              })}
              </ul>
              <ul className='flex flex-row justify-center items-center pl-0 mt-12'>
              {mediaLinks.map(({id, icon, href}) => {
                  return (
                  <li key={id} className="px-4 cursor-pointer hover:text-white">
                      <a href={href} target='_blank' className='text-decoration-none'>{icon}</a>
                  </li>
                  );
              })}
              </ul>
            </div>
        )}
    </div>
  )
}

export default NavBar

