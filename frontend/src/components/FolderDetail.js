import axios from "axios";
import { useEffect, useState } from "react";
import FolderOverview from "./FolderOverview";
import FolderItems from "./FolderItems";

function FolderDetail({ match, location, history }) {

    const [folderDetail, setFolderDetail] = useState({
        items: []
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/${match.params.id}/detail`)
            .then((res) => {
                setFolderDetail(res.data[0])
            })
    }, [])

    return (
        <div>
            <FolderItems data={{id: folderDetail._id}}></FolderItems>
        </div>
    )
}

export default FolderDetail;