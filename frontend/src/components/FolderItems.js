import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/thumbnailList.scss'

function FolderItems(props) {

    // const [folderDetail, setFolderDetail] = useState({})
    const [items, setItems] = useState([])

    useEffect(() => {
        if (props.data.id === undefined) {
            return
        }
        axios.get(`http://192.168.0.2:3000/${props.data.id}/Detail`)
            .then((result) => {
                setItems(result.data[0].items)
            })
    }, [props.data.id])

    return (
        <div className="container-thumbnail">
            {items.map((item, index) => {
                return (
                    <div className="item-thumbnail" key={index}>
                        <Link
                            to={{
                                pathname: `/${props.data.id}/item`,
                                state: {
                                    currentIndex: index,
                                    maxIndex: items.length
                                },
                            }}>
                            <img src={`http://192.168.0.2:3000/${props.data.id}/thumbnail?index=${index}`}></img>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default FolderItems;