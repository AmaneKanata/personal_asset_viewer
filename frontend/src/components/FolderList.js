import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FolderList() {

    const [folderList, setFolderList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/list")
            .then((res) => {
                setFolderList(res.data)
                console.log(res.data)
            })
    }, [])

    return (
        <div>
            <ol>
                {
                    folderList.map((value) => {
                        return (
                            <li>
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