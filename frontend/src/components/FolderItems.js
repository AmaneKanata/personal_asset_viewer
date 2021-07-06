import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/thumbnailList.scss'
import { Route } from 'react-router';
import Item from './Item.js'

function FolderItems(props) {

    const [thumbnails, setThumbnails] = useState([])
    const [maxIndex, setMaxIndex] = useState(0)

    useEffect(() => {
        if(props.data.id === undefined) {
            return
        }
        console.log(props.data.id)

        axios.get(`http://localhost:3000/${props.data.id}/thumbnail`)
            .then((result) => {
                console.log(result)
                setThumbnails(result.data)
                setMaxIndex(result.data.length)
            })
    }, [props.data.id])

    return (
        <div className="container-thumbnail">
            {[...Array(thumbnails.length)].map((e, index) => {
                return (
                    <div className="item-thumbnail" key={index}>
                        <Link
                            to={{
                                pathname: `/${props.data.id}/item`,
                                state: {
                                    currentIndex: index,
                                    maxIndex: maxIndex
                                },
                            }}>
                            <img src={thumbnails[index]}></img>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default FolderItems;