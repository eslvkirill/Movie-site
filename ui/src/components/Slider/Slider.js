import React from "react";
import Slide from "./Slide/Slide";
import "./Slider.scss";

const Slider = () => (
  <section className="Slider">
    <div className="SliderWrapper">
      {/* {this.state.slides.map((slide, index) => {
            return ( */}
      <Slide
        // key={index}
        engTitle="The Grand Budapest Hotel"
        rusTitle="Отель Гранд Будапешт"
        // url={slide.url}
      />
      {/* );
          })} */}
    </div>
  </section>
);

export default Slider;
