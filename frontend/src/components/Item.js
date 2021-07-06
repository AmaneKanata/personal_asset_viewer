import { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/item.scss"

function Item(props) {

    const slider = useRef();

    const setting = {
        lazyLoad: true,
        infinite: false,
        arrows: false
    }

    useEffect(() => {
        slider.current.slickGoTo(props.location.state.currentIndex, true)
        console.log(props)
    })

    const getSliderComponent = function () {
        console.log("maxindex : " + props.location.state.maxIndex)
        return [...Array(props.location.state.maxIndex)].map((e, index) => {
            return (
                <div key={index}>
                    <img
                        src={
                            `http://localhost:3000/${props.match.params.id}/item?index=${index}`
                        }
                        loading="lazy"
                        className ="page"
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
                className = "slider"
            >{getSliderComponent()}</Slider>
        </div>
    )
}

export default Item;