import { Component } from "react";
import "./Slider.css";

const sliderImages = ["/ai2.jpg", "/ai1.jpg", "/novaai.webp"];

class SliderClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  handlePrevious = () => {
    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex === 0
          ? sliderImages.length - 1
          : prevState.currentIndex - 1,
    }));
  };

  handleNext = () => {
    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex === sliderImages.length - 1
          ? 0
          : prevState.currentIndex + 1,
    }));
  };

  render() {
    const { currentIndex } = this.state;

    return (
      <div className="slider">
        <div className="slider-main">
          <button className="slider-btn" onClick={this.handlePrevious}>
            &#9664; Prev
          </button>
          <img
            className="slider-image"
            src={sliderImages[currentIndex]}
            alt={"Slide " + (currentIndex + 1)}
          />
          <button className="slider-btn" onClick={this.handleNext}>
            Next &#9654;
          </button>
        </div>
        <p className="slider-indicator">
          {currentIndex + 1} / {sliderImages.length}
        </p>
      </div>
    );
  }
}

export default SliderClassComponent;
