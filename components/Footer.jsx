import React, { useState, useEffect} from "react";
import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS,SOCIAL_LINKS } from "@/constants";
import NavItem from "./NavItem";

function Footer() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
      }
    }, []);
    const currentYear = new Date().getFullYear();

    function SocialIcon({ name }) {
        switch (name) {
          case "Facebook":
            return (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path fill="currentColor" d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"/>
              </svg>
            );
          case "Instagram":
           return <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" flex><path fill="currentColor" d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"/></svg>;
          case "LinkedIn":
            return <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" flex> <path fill="currentColor" d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/></svg>;
          default:
            return null;
        }
      }



  return (
    <div className="max-w-[1440px] relative mx-auto bg-white dark:bg-black text-black dark:text-white ">
    <div className="TB:flex-row flex-col justify-between  p-10 items-start gap-5 flex">
        <div className=" flex-col justify-start items-start gap-5 flex">
        <Link href="/" passHref>
          <div className="image-container pb-3 TB:pb-0 cursor-pointer" style={{ maxWidth: '280px' }}>
            <Logo />
          </div>
        </Link>
            <div className="text-base font-normal  leading-normal">Stay up to date on the latest features and releases by joining our newsletter.</div>
   
        </div>
        
        <div className="flex-row justify-start items-start gap-10 flex">
            <ul className="flex-col justify-start items-start text-sm font-normal leading-[21px] gap-3 flex">
          {NAV_LINKS.map(link => (
            <NavItem key={link.key} link={link} currentPath={currentPath} />
          ))}
        </ul>
        <div className="flex-col justify-start items-start gap-3 ml-5 flex">
      <div className="text-base font-semibold leading-normal">Follow us</div>
      <div className="flex-col justify-start items-start flex">
      {SOCIAL_LINKS.map((link) => (
  <a href={link.url} key={link.name} className="py-2 justify-start items-center gap-3 flex">
    <div className="w-6 h-6 relative">
      <SocialIcon name={link.name} />
    </div>
    <div className="text-sm font-normal leading-[21px]">{link.name}</div>
  </a>
))}
      </div>
    </div> 
    </div> 
    </div>    
    
        <div className="border border-stone-300" />
        <div className="flex flex-row TB:justify-center items-center py-5">
      <h2 className="text-sm font-normal leading-[21px]">© {currentYear} Brander. All rights reserved.</h2>
    </div>
    
</div>
  )
}

export default Footer