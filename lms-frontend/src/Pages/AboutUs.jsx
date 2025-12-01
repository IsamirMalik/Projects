import HomeLayout from "../Components/HomeLayout";
import aboutMainImage from "../assets/images/aboutMainImage.png";
import React from "react";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
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
          <div className="w-1/2">
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
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
              {/* <img
                src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                className="w-full" /> */}
                <p className=" text-3xl text-gray-200 font-semibold font-serif text-center">{"Education is the most powerfull tool you can use to change the world ."}</p>
                <h3 className="text-2xl text-gray-200">- Nelson Mandela</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide5" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
              {/* <img
                src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                className="w-full" /> */}
                <p className=" text-3xl text-gray-200 font-semibold font-serif text-center">{"Education is not preparation for life , Education is life itself ."}</p>
                <h3 className="text-2xl text-gray-200">- John Dewey</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
              {/* <img
                src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                className="w-full" /> */}
                <p className=" text-3xl text-gray-200 font-semibold font-serif text-center">{"Education is our Passport to the Future"}</p>
                <h3 className="text-2xl text-gray-200">- Malcom X</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide4" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
              {/* <img
                src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                className="w-full" /> */}
                <p className=" text-3xl text-gray-200 font-semibold font-serif text-center">{"An Investment in Knowledge Pays the Best Interest"}</p>
                <h3 className="text-2xl text-gray-200">- Benjamin Franklin</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">❮</a>
                <a href="#slide5" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
              {/* <img
                src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                className="w-full" /> */}
                <p className=" text-3xl text-gray-200 font-semibold font-serif text-center">{"Education is one thing no one can take away from you."}</p>
                <h3 className="text-2xl text-gray-200">- Elin Nordigren</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
