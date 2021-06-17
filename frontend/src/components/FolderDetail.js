import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FolderList from "./FolderList";
import FolderOverview from "./FolderOverview";
import FolderItems from "./FolderItems";
import SlickTest from "./SlickTest";

function FolderDetail({ match }) {

    const [folderDetail, setFolderDetail] = useState({
        items : []
    });

    useEffect(() => {
        axios.get("http://localhost:3000/detail/" + match.params.folderId)
        .then((res) => {
            setFolderDetail(res.data[0])
        })
    }, [])

    return (
        <div>
            <FolderOverview data = {{
                authors : folderDetail.authors,
                parodies : folderDetail.parodies,
                tags : folderDetail.tags
            }}></FolderOverview>
            {
                folderDetail.items.map((items) => {
                    console.log(folderDetail)
                    return (
                        <FolderItems data = {{
                            id : folderDetail._id,
                            type : items.type,
                            length : items.paths.length
                        }}></FolderItems>
                    )
                })
            }
            {/* <SlickTest></SlickTest> */}
        </div>
    )
}

export default FolderDetail;