import { useEffect, useRef, useState } from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Item(props) {

    const slider = useRef();

    const setting = {
        lazyLoad: true
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

// const [index, setIndex] = useState(props.location.state.currentIndex)

// const nextClicked = function () {
//     console.log("next clicked " + index)
//     if (index < props.location.state.maxIndex) {
//         setIndex(parseInt(index) + 1)
//     }
// }

// const previousClicked = function () {
//     console.log("prev clicked " + index)
//     if (index > 0) {
//         setIndex(parseInt(index) - 1)
//     }
// }

// {
//     (() => {
//         if (index == undefined) {
//             console.log("index is undi")
//             return null;
//         }
//         return (
//             <img
//                 src={"http://localhost:3000/item?"
//                     + "id=" + props.match.params.id + "&"
//                     + "type=" + props.match.params.type + "&"
//                     + "index=" + index
//                 }
//             />
//         )
//     })()
// }
//     <button onClick={previousClicked}>Previous</button>
//     <button onClick={nextClicked}>Next</button>
//     <Link to={"/" + props.match.params.id}>Folder</Link> <br />
//     <Link to={"/"}> Main </Link> <br />