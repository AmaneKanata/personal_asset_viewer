import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Configuration from "../Configuration";

function FolderList() {

    const [folderList, setFolderList] = useState([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {

        axios.get("http://localhost:3000/list", {
            params: {
                begin: current * Configuration.size,
                // end: ((current + 1) * Configuration.size)
                size: Configuration.size
            }
        }).then((res) => {
            if (res.data.length > 0) {
                // console.log(res.data)
                setFolderList(folderList.concat(res.data))
                setCurrent(current + 1)
            }
        })
    }, [current])

    return (
        <div>
            <ol>
                {
                    folderList.map((value) => {
                        return (
                            <li key={value._id}>
                                <Link to={"/" + value._id}>
                                    {value.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}

export default FolderList;