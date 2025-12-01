import React from "react";

function CarouselSlide({title , description , slideNumber , totalSlides}) {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
      <div className="flex flex-col justify-center items-center gap-4 px-[15%]">
        {/* <img
                src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                className="w-full" /> */}
        <p className=" text-3xl text-gray-200 font-semibold font-serif text-center">
          {description}
        </p>
        <h3 className="text-2xl text-gray-200">- {title}</h3>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href={`#slide${(slideNumber == 1 ? totalSlides : (slideNumber - 1))}`} className="btn btn-circle">
            ❮
          </a>
          <a href={`#slide${(slideNumber) % totalSlides + 1}`} className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}

export default CarouselSlide;
