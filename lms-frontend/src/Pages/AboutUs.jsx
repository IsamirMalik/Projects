import CarouselSlide from "../Components/CarouselSlide";
import HomeLayout from "../Components/HomeLayout";
import aboutMainImage from "../assets/images/aboutMainImage.png";
import content  from "../Constants/CarouselContent";
import React from "react";

function AboutUs() {

  

  return (
    <HomeLayout >
      <div className="pl-20 pt-20 flex flex-col text-white ">
        <div className="flex items-center gap-5 mx-10 justify-around">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">Affordable and quality education</h1>
            <p className="text-xl text-gray-200">
              Our mission is to provide affordable and quality education to
              everyone. We are providing the platform to the aspiring educators
              and students to share their skills , creativity and knowledge with
              each other to empower and contribute in the growth and wellness of
              mankind .
            </p>
          </section>
          <div className="w-1/3">
            <img
            id="test1"
            style={{
              filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
            }}
            className="drop-shadow-2xl" 
            src={aboutMainImage}
            alt="About main image"
              />
          </div>
        </div>

        <div className="carousel w-1/2 my-16 m-auto">
            
            {content && content.map((item , index) => (<CarouselSlide key={index} title={item.title} description={item.description} slideNumber={item.slideNumber} totalSlides={content.length} />))}
          
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
