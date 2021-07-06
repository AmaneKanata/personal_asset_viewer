import axios from "axios";
import { useEffect, useState } from "react";
import FolderOverview from "./FolderOverview";
import FolderItems from "./FolderItems";

function FolderDetail({ match, location, history }) {

    const [folderDetail, setFolderDetail] = useState({
        items: []
    });

    useEffect(() => {
        axios.get("http://localhost:3000/detail/" + match.params.folderId)
            .then((res) => {
                setFolderDetail(res.data[0])
            })
    }, [])

    const back = function () {
        console.log("test")
        history.push('/')
    }

    return (
        <div>
            {/* <button onClick={back}>back</button>
            <FolderOverview data={{
                authors: folderDetail.authors,
                parodies: folderDetail.parodies,
                tags: folderDetail.tags
            }}></FolderOverview> */}
            {
                folderDetail.items.map((items) => {
                    console.log(folderDetail)
                    return (
                        <FolderItems data={{
                            id: folderDetail._id,
                            type: items.type,
                            length: items.paths.length
                        }}
                        key={items.type}
                        ></FolderItems>
                    )
                })
            }
            {/* <SlickTest></SlickTest> */}
        </div>
    )
}

export default FolderDetail;