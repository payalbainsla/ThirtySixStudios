import React, { useEffect, useState, useRef } from 'react'
import './index.css';
import Canvas from "./Canvas.jsx";
import data from "./data.js";
import LocomotiveScroll from "locomotive-scroll";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";


function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);
  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);
  return (
    <>
    <span ref={growingSpan} className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"></span>
    <div className="w-full relative min-h-screen font-[Helvetica_Now_Display]">
       
       
     {showCanvas &&
     data[0].map((canvasdets, index) => <Canvas details={canvasdets} />
     )}
     <div className="w-full relative z-[1] h-screen relative">
      <nav className=" w-full p-8 flex justify-between z-50">
        <div className="brand text-2xl font-regular">thirtysixstudios</div>
        <div className="links flex gap-10">
          {["Home", "About", "Projects", "Contact"].map((link, index) => (
            <a 
            key={index}
            href={`#${link.toLowerCase()}`}
            className="text-md hover:text-gray-300"
            >
             {link}
            </a>
          ))}
        </div>
      </nav>
       
       <div className="textcontainer w-full px-[25%]">
        <div className="text w-[45%]">
        <h3 className="text-4xl leading-[1.2]">
          At Thirtysixstudio, we build
           digital assets and immersive 
          experiences for purposeful brands.
        </h3>
        <p className="text-lg w-[120%] mt-10 font-normal">
           We're a boutique production studio 
           focused on design, animation, and technology, constantly rethinking what digital craft can do 
           for present-day ads and campaigns.
        </p>
        <p className="text-lg mt-10">Scroll</p>
       </div>
       
      </div>
      <div className="w-full absolute bottom-0 left-0">
        <h1 ref={headingref} className="text-[15rem] flex justify-evenly tracking-tight font-normal leading-none">Thirtysixstudios</h1>
      </div>
      
      </div>   
    </div>
     <div className="w-full relative h-screen  mt-32 px-10">
      {data[1].map((canvasdets, index) => (
      
        <Canvas details={canvasdets} />
     ))}
     <div className="relative">
 <h1 className="text-6xl tracking-tighter">about the brand</h1>
      <p className="text-3xl leading-[1.2] w-[80%] mt-10 font-light">ThirtySixStudio is built on the 
        belief that design is more than
         aesthetics—it is storytelling, 
         emotion, and identity. The brand 
         represents a fusion of creativity 
         and strategy, where every project 
         is approached with a balance of 
         artistry and precision. Inspired by
          modern culture and timeless craftsmanship, ThirtySixStudio thrives on creating experiences that feel both innovative and authentic. From bold visual concepts to subtle details, the studio’s work reflects a commitment to originality and impact. It is not just about delivering design solutions, but about shaping narratives that resonate deeply with audiences. ThirtySixStudio stands as a symbol of imagination, collaboration, and the pursuit of 
        excellence in every creative journey.</p>
     <img 
     className="w-[80%] mt-10"
     src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"></img>
    
     </div>
     </div>
     </>
  );
}

export default App;
