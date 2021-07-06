import { Link } from "react-router-dom";
import '../css/thumbnailList.scss'

var id;
var type;
var maxIndex;

function FolderItems(props) {

    id = props.data.id;
    type = props.data.type;
    maxIndex = props.data.length;

    return (
        <div className="container-thumbnail">
            {[...Array(props.data.length)].map((e, index) => {
                return (
                    <ItemThumbnail
                    data={{
                        index: index,
                        // id: props.data.id,
                        // type: props.data.type,
                        // maxIndex : props.data.length
                    }} 
                    key={index}/>
                )
            })}
        </div>
    )
}

function ItemThumbnail(props) {

    return (
        <div className="item-thumbnail">
            <Link
                // to={`/item/${props.data.id}/${props.data.type}/${props.data.index}`}
                to={{
                    pathname: `/${id}/item/${type}`,
                    state: {
                        currentIndex: props.data.index,
                        maxIndex: maxIndex
                    },
                }}>
                <img
                    src={"http://localhost:3000/item?"
                        + "id=" + id + "&"
                        + "type=" + type + "&"
                        + "index=" + props.data.index
                    } />
                <p>{props.data.index + 1}</p>
            </Link>
        </div>
    )
}

export default FolderItems;