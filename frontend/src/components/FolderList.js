import { Link } from "react-router-dom";
import { FixedSizeGrid } from 'react-window'
import Autosizer from 'react-virtualized-auto-sizer'
import '../css/folderList.scss'
import Configuration from "../Configuration";
import { useEffect, useState } from "react";
import { useScroll } from '../hooks/useScroll.js'
import { Fragment } from "react";

const gridHeight = Configuration.getGridheight()
const gapHeight = Configuration.getGapheight()

function FolderList(props) {

    const { scrollY } = useScroll()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        setCurrent(Math.floor(scrollY / (gridHeight + gapHeight)))
        console.log(current)
    }, [scrollY])

    return (
        // <div className="container">
        //     {
        //         current > 0 &&
        //         <InvisibleRows rows={current}></InvisibleRows>
        //     }
        //     {
        //         props.folderList != undefined &&
        //         props.folderList.length > 0 &&
        //         [...new Array(20)].map((_, index) => {
        //             const value = props.folderList[current * 2 + index]
        //             return (
        //                 <Link to={"/" + value._id} key={value._id}>
        //                     <figure className="item">
        //                         <img src={value.thumbnail} loading="lazy" />
        //                         <figcaption className="item-name">
        //                             <p>{value.name}</p>
        //                         </figcaption>
        //                     </figure>
        //                 </Link>
        //             )
        //         })}
        //     {
        //         current + 10 < Math.ceil(props.folderList.length / 2) &&
        //         <InvisibleRows
        //             rows={Math.ceil(props.folderList.length / 2) - current - 10}
        //         ></InvisibleRows>
        //     }
        // </div>

        <div className="container" >
            {props.folderList.map((value) => {
                return (
                    <Link to={"/" + value._id} key={value._id}>
                        <figure className="item">
                            <img src={value.thumbnail} loading="lazy" />
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

function InvisibleRows(props) {
    return (
        <div>
            {[...new Array(Configuration.columnNumber)].map((e, index) => {
                return (
                    <div className="item"
                        style={{ "paddingBottom": `calc(${100 * props.rows}% - ${0.3 * props.rows}em)` }}
                    ></div>
                )
            })}
        </div>
    )
}

function OptimisticRow(props) {
    return (
        <Fragment>
            {[...new Array(2)].map((_, i) => (
                <div key={i} className='table-cell optimistic' style={{ height: props.rows * (gridHeight + gapHeight) }} />
            ))}
        </Fragment>
    )
}


// function FolderList(props) {

//     return (
//         <Autosizer>
//             {((height, width) => {
//                 return (
//                     <FixedSizeGrid
//                         columnCount={1000}
//                         columnWidth={100}
//                         height={150}
//                         rowCount={1000}
//                         rowHeight={35}
//                         width={300}
//                     >
//                         {FolderThumbnail}
//                     </FixedSizeGrid>
//                 )
//             }
//             )()}
//         </Autosizer>
//     )
// }

// function FolderThumbnail(props) {
//     return (
//         <div style={props.style}>
//             ITEM {props.columnIndex} {props.rowIndex}
//         </div>
//     )
// }


export default FolderList;