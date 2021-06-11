import { useState } from "react";
import { Link } from "react-router-dom";

function Item(props) {

    const [index, setIndex] = useState(props.location.state.currentIndex)

    const nextClicked = function () {
        console.log("next clicked " + index)
        if (index < props.location.state.maxIndex) {
            setIndex(parseInt(index) + 1)
        }
    }

    const previousClicked = function () {
        console.log("prev clicked " + index)
        if (index > 0) {
            setIndex(parseInt(index) - 1)
        }
    }

    return (
        <div>
            {
                (() => {
                    if (index == undefined) {
                        console.log("index is undi")
                        return null;
                    }
                    return (
                        <img
                            src={"http://localhost:3000/item?"
                                + "id=" + props.match.params.id + "&"
                                + "type=" + props.match.params.type + "&"
                                + "index=" + index
                            }
                        />
                    )
                })()
            }
            <button onClick={previousClicked}>Previous</button>
            <button onClick={nextClicked}>Next</button>
            {/* {(() => {
                if (props.match.params.index > 0) {
                    return (
                        <Link to={{
                            pathname: `/item/${props.match.params.id}/${props.match.params.type}/${parseInt(props.match.params.index) - 1}`,
                            state: { maxIndex: props.location.state.maxIndex }
                        }} >
                            Previous
                        </Link>
                    )
                }
            })()}
            <br/>
            {(() => {
                if (props.match.params.index < props.location.state.maxIndex) {
                    return (
                        <Link to={{
                            pathname: `/item/${props.match.params.id}/${props.match.params.type}/${parseInt(props.match.params.index) + 1}`,
                            state: { maxIndex: props.location.state.maxIndex }
                        }} >
                            Next
                        </Link>
                    )
                }
            })()}
            <br/> */}
            <Link to={"/" + props.match.params.id}>Folder</Link> <br />
            <Link to={"/"}> Main </Link> <br />
        </div>
    )
}

export default Item;