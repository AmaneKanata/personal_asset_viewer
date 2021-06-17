import { Link } from "react-router-dom";
import Item from './Item.js'

var id;
var type;
var maxIndex;

function FolderItems(props) {

    id = props.data.id;
    type = props.data.type;
    maxIndex = props.data.length;

    return (
        <div>
            <h1>Folder items</h1>
            <h1>type : {props.data.type}</h1>
            {
                [...Array(props.data.length)].map((e, index) => {
                    return (
                        <ItemThumbnail data={{
                            index: index,
                            // id: props.data.id,
                            // type: props.data.type,
                            // maxIndex : props.data.length
                        }} />
                    )
                })
            }
        </div>
    )
}


// function ItemThumbnail(props) {

//     return (
//         <div>
//             <Link
//                 // to={`/item/${props.data.id}/${props.data.type}/${props.data.index}`}
//                 to={{
//                     pathname: `/item/${props.data.id}/${props.data.type}/${props.data.index}`,
//                     state: {
//                         maxIndex: maxIndex
//                     },
//                 }}
//             >
//                 <img
//                     src={"http://localhost:3000/item?"
//                         + "id=" + props.data.id + "&"
//                         + "type=" + props.data.type + "&"
//                         + "index=" + props.data.index
//                     }
//                 />
//                 <p>{props.data.index + 1}</p>
//             </Link>
//         </div>
//     )
// }

function ItemThumbnail(props) {

    return (
        <div>
            <Link
                // to={`/item/${props.data.id}/${props.data.type}/${props.data.index}`}
                to={{
                    pathname: `/${id}/item/${type}`,
                    state: {
                        currentIndex: props.data.index,
                        maxIndex: maxIndex
                    },
                }}
            >
                <img
                    src={"http://localhost:3000/item?"
                        + "id=" + id + "&"
                        + "type=" + type + "&"
                        + "index=" + props.data.index
                    }
                />
                <p>{props.data.index + 1}</p>
            </Link>
        </div>
    )
}

export default FolderItems;