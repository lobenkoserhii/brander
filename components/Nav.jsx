import React, { useState, useEffect, useCallback,useContext } from "react";
import { NAV_LINKS } from "@/constants";
import { ThemeContext } from './ThemeContext';
import Link from "next/link";
import ThemeToggle from "./ThemToggle";
import Logo from "./Logo";
import NavItem from "./NavItem";
import GetStartedButton from "./GetStartedButton"
import { MenuIcon, CloseIcon } from "./MenuIcons";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isSticky, setIsSticky] = useState(false); // Добавляем состояние для "липкости"

  useEffect(() => {
    const scrollHandler = () => {
      // Устанавливаем "липкость" навбара, когда прокрутка страницы больше высоты вьюпорта
      setIsSticky(window.scrollY > window.innerHeight);
    };
  
    window.addEventListener('scroll', scrollHandler);
  
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);

  const { theme } = useContext(ThemeContext);
  const navClass = theme === 'dark' ? 'glass-matt-dark' : 'glass-matt';

  return (
    <nav className={`${navClass} ${isSticky ? 'fixed' : 'absolute'} top-0 w-screen mx-auto z-20 py-4 px-5 TB:px-8 NPC:px-[70px] flex flex-col-reverse TB:flex-row justify-between items-center gap-5`}>

      <div className="flex justify-between flex-col-reverse items-center TB:flex-row w-full">
        <div onClick={toggleMenu} className="cursor-pointer z-30 NPC:hidden">
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        <ul className={`w-full TB:w-[200px] NPC:w-auto z-20 flex text-lg flex-col NPC:flex-row items-center justify-between NPC:gap-5 ${isMenuOpen ? "flex" : "hidden"} NPC:flex`}>
          {NAV_LINKS.map(link => (
            <NavItem key={link.key} link={link} currentPath={currentPath} />
          ))}
        </ul>

        <Link href="/" passHref>
          <div className="image-container pb-3 TB:pb-0 cursor-pointer" style={{ maxWidth: '280px' }}>
            <Logo />
          </div>
        </Link>

        <GetStartedButton isDesktop={true} />

        <div className="flex mb-5 TB:mb-0 NPC:absolute top-5 right-5 ">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}


export default Nav;