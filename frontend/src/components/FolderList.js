import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Configuration from "../Configuration";
import '../css/gallery.scss'

function FolderList(props) {


    // const [folderList, setFolderList] = useState([])
    // const [current, setCurrent] = useState(0)

    // useEffect(() => {

    //     axios.get("http://localhost:3000/list", {
    //         params: {
    //             begin: current * Configuration.size,
    //             // end: ((current + 1) * Configuration.size)
    //             size: Configuration.size
    //         }
    //     }).then((res) => {
    //         if (res.data.length > 0) {
    //             // console.log(res.data)
    //             setFolderList(folderList.concat(res.data))
    //             setTimeout(() => {
    //                 setCurrent(current + 1)
    //             }, 1000);
    //         }
    //     })
    // }, [current])


    return (
        <div className="lookbook-gallery" >
            <div className="lookbook-grid" role="region">
                {
                    props.folderList.map((value) => {
                        return (
                            <Link to={"/" + value._id}>
                                <figure className="model">
                                    <img src={`http://localhost:3000/cover/${value._id}`} />
                                    <figcaption className="model--caption">
                                        <p>{value.name}</p>
                                    </figcaption>
                                </figure>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FolderList;