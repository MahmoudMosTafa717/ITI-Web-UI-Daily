import { useState } from "react";
import "./Slider.css";

const sliderImages = ["/ai2.jpg", "/ai1.jpg", "/novaai.webp"];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider">
      <div className="slider-main">
        <button className="slider-btn" onClick={handlePrevious}>
          &#9664; Prev
        </button>

        <img
          className="slider-image"
          src={sliderImages[currentIndex]}
          alt={"Slide " + (currentIndex + 1)}
        />

        <button className="slider-btn" onClick={handleNext}>
          Next &#9654;
        </button>
      </div>

      <p className="slider-indicator">
        {currentIndex + 1} / {sliderImages.length}
      </p>
    </div>
  );
};

export default Slider;
