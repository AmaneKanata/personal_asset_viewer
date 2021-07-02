import { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Item(props) {

    const slider = useRef();

    const setting = {
        lazyLoad: true,
        infinite: false
    }

    useEffect(() => {
        slider.current.slickGoTo(props.location.state.currentIndex, true)
    })

    const getSliderComponent = function () {
        return [...Array(props.location.state.maxIndex)].map((e, index) => {
            return (
                <div>
                    <img
                        src={
                            "http://localhost:3000/item?"
                            + "id=" + props.match.params.id + "&"
                            + "type=" + props.match.params.type + "&"
                            + "index=" + index
                        }
                        loading="lazy"
                    >
                    </img>
                </div>
            )
        })
    }

    return (
        <div>
            <Slider
                {...setting}
                ref={slider}
            >{getSliderComponent()}</Slider>
        </div>
    )
}

export default Item;