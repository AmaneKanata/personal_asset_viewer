import { Link } from "react-router-dom";
import { FixedSizeGrid } from 'react-window'
import Autosizer from 'react-virtualized-auto-sizer'
import '../css/folderList.scss'
import Configuration from "../Configuration";
import { useEffect, useRef, useState } from "react";
import { useScroll } from '../hooks/useScroll.js'
import { Fragment } from "react";
import { debounce } from "lodash"

const windowHeight = Configuration.getWindowHeight()
const windowWidth = Configuration.getWindowWidth()

// function FolderList(props) {

//     const { scrollY } = useScroll()
//     const [current, setCurrent] = useState(0)

//     useEffect(() => {
//         setCurrent(Math.floor(scrollY / (gridHeight + gapHeight)))
//         console.log(current)
//     }, [scrollY])

//     return (
//         // <div className="container">
//         //     {
//         //         current > 0 &&
//         //         <InvisibleRows rows={current}></InvisibleRows>
//         //     }
//         //     {
//         //         props.folderList != undefined &&
//         //         props.folderList.length > 0 &&
//         //         [...new Array(20)].map((_, index) => {
//         //             const value = props.folderList[current * 2 + index]
//         //             return (
//         //                 <Link to={"/" + value._id} key={value._id}>
//         //                     <figure className="item">
//         //                         <img src={value.thumbnail} loading="lazy" />
//         //                         <figcaption className="item-name">
//         //                             <p>{value.name}</p>
//         //                         </figcaption>
//         //                     </figure>
//         //                 </Link>
//         //             )
//         //         })}
//         //     {
//         //         current + 10 < Math.ceil(props.folderList.length / 2) &&
//         //         <InvisibleRows
//         //             rows={Math.ceil(props.folderList.length / 2) - current - 10}
//         //         ></InvisibleRows>
//         //     }
//         // </div>

//         <div className="container" >
//             {props.folderList.map((value) => {
//                 return (
//                     <Link to={"/" + value._id} key={value._id}>
//                         <figure className="item">
//                             <img src={value.thumbnail} loading="lazy" />
//                             <figcaption className="item-name">
//                                 <p>{value.name}</p>
//                             </figcaption>
//                         </figure>
//                     </Link>
//                 )
//             })}
//         </div>
//     )
// }

// function InvisibleRows(props) {
//     return (
//         <div>
//             {[...new Array(Configuration.columnNumber)].map((e, index) => {
//                 return (
//                     <div className="item"
//                         style={{ "paddingBottom": `calc(${100 * props.rows}% - ${0.3 * props.rows}em)` }}
//                     ></div>
//                 )
//             })}
//         </div>
//     )
// }

// function OptimisticRow(props) {
//     return (
//         <Fragment>
//             {[...new Array(2)].map((_, i) => (
//                 <div key={i} className='table-cell optimistic' style={{ height: props.rows * (gridHeight + gapHeight) }} />
//             ))}
//         </Fragment>
//     )
// }

function FolderList(props) {

    const gridRef = useRef()

    useEffect(() => {
        gridRef.current.scrollTo({
            scrollLeft: 0,
            scrollTop: props.scrollOffset
        })
    })

    const onScroll = debounce((scrollInfo) => {
        props.setScrollOffset(scrollInfo.scrollTop)
    }, 100)

    return (
        <div id="folderThumbnailGrid">
            <FixedSizeGrid
                ref={gridRef}

                columnCount={Configuration.columnNumber}
                rowCount={Math.ceil(props.folderList.length / 2)}

                columnWidth={windowWidth / 2}
                rowHeight={windowWidth / 2}

                height={windowHeight}
                width={windowWidth}

                itemData={props.folderList}

                onScroll={onScroll}
            >
                {FolderThumbnail}
            </FixedSizeGrid>
        </div>
    )
}

function FolderThumbnail(props) {
    // return (
    //     <div style={props.style}>
    //         ITEM {props.columnIndex + props.rowIndex*2}
    //     </div>
    // )

    const index = props.columnIndex + props.rowIndex * 2
    const folderData = props.data[index]

    if (props.data === undefined) {
        return (
            <div style={props.style}>
                <p>loading...</p>
            </div>
        )
    } else {
        return (
            <div style={props.style}>
                <Link to={"/" + folderData._id} key={folderData._id}>
                    <figure className="folderThumbnailItem">
                        <img src={folderData.thumbnail} loading="lazy" />
                        <figcaption className="item-name">
                            <p>{folderData.name}</p>
                        </figcaption>
                    </figure>
                </Link>
            </div>
        )
    }
}


export default FolderList;