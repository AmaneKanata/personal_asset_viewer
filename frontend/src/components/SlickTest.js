import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SlickTest() {

    const renderSlides = () =>
    [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
      <div>
        <h3>Slide {num}</h3>
      </div>
    ));

  return (
    <div className="App">
      <Slider>{renderSlides()}</Slider>
    </div>
  );

}

export default SlickTest;