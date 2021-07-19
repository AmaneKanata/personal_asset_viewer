import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import PropTypes from 'prop-types'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/item.scss"

function Item(props) {

    const slider = useRef();

    useEffect(() => {
        slider.current.slickGoTo(props.location.state.currentIndex, true)
    })

    const getSliderComponent = function () {
        return [...Array(props.location.state.maxIndex)].map((e, index) => (
                <div key={props.match.params.id}>
                    <img
                        src={`http://localhost:3000/${props.match.params.id}/item?index=${index}`}
                        alt=""
                        loading="lazy"
                        className ="page"
                     />
                </div>
            ))
    }

    return (
        <div>
            <Slider
                lazyLoad="true"
                infinite="false"
                arrows="false"
                ref={slider}
                className = "slider"
            >{getSliderComponent()}</Slider>
        </div>
    )
}

Item.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            currentIndex: PropTypes.number,
            maxIndex: PropTypes.number
        })
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
}

export default Item;