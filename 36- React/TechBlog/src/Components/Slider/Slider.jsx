// Slider.jsx
// This component renders a slider with images.
import React from "react";
import "./Slider.css";

// FUNCTION VERSION (commented)
/*
function Slider() {
  return (
    <div className="slider">
      <img src="/1.jpg" alt="Slider 1" />
      <img src="/2.jpg" alt="Slider 2" />
      <img src="/3.jpg" alt="Slider 3" />
    </div>
  );
}
*/

// CLASS VERSION (used)
class Slider extends React.Component {
  render() {
    return (
      <div className="slider">
        <img src="/1.jpg" alt="Slider 1" />
        <img src="/2.jpg" alt="Slider 2" />
        <img src="/3.jpg" alt="Slider 3" />
      </div>
    );
  }
}

export default Slider;
