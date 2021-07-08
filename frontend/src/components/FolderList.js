import { Link } from "react-router-dom";
import '../css/folderList.scss'

function FolderList(props) {

    return (
        <div className="container" >
            {props.folderList.map((value) => {
                return (
                    <Link to={"/" + value._id} key={value._id}>
                        <figure className="item">
                            <img src={value.thumbnail} loading="lazy"/>
                            <figcaption className="item-name">
                                <p>{value.name}</p>
                            </figcaption>
                        </figure>
                    </Link>
                )
            })}
        </div>
    )
}

export default FolderList;