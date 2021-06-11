import { Link } from "react-router-dom";

function Item(props) {

    return (
        <div>
            <img
                src={"http://localhost:3000/item?"
                    + "id=" + props.match.params.id + "&"
                    + "type=" + props.match.params.type + "&"
                    + "index=" + props.match.params.index
                }
            />
            {(() => {
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
            <br/>
            <Link to = {"/" + props.match.params.id}>Folder</Link> <br/>
            <Link to ={"/"}> Main </Link> <br/>
        </div>
    )
}

export default Item;