import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Configuration from "../Configuration";

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
        <div>
            <ul>
                {
                    props.folderList.map((value) => {
                        return (
                            <li key={value._id}>
                                <Link to={"/" + value._id}>
                                    <img src={`http://localhost:3000/cover/${value._id}`}></img>
                                    <br/>
                                    {value.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default FolderList;