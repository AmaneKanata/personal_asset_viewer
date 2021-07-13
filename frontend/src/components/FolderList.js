import { Link } from "react-router-dom";
import '../css/folderList.scss'
import Configuration from "../Configuration";
import { useEffect } from "react";
import { Grid, WindowScroller } from "react-virtualized";

const windowWidth = Configuration.getWindowWidth()
let folderList = undefined;

function FolderList(props) {

    useEffect(() => {
        folderList = props.folderList
    })

    return (
        <WindowScroller>
            {({ height, registerChild, isScrolling, scrollTop }) => (
                <div ref={registerChild}>
                    <Grid
                        autoHeight
                        height={height}
                        width={windowWidth}
                        columnCount={Configuration.columnNumber}
                        rowCount={Math.ceil(props.folderList.length / 2)}
                        columnWidth={windowWidth / 2}
                        rowHeight={windowWidth / 2}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        onScroll={() => {}}
                        cellRenderer={cellRenderer}
                    >
                    </Grid>
                </div>
            )}
        </WindowScroller>
    )
}

function cellRenderer(props) {
    const index = props.columnIndex + props.rowIndex * 2

    if (folderList === undefined) {
        return (
            <div style={props.style} key={props.key}>
                <p>loading...</p>
            </div>
        )
    } else if(folderList[index] === undefined) {
        return (
            <div style={props.style} key={props.key}>
            </div>
        )
    } else {
        const folderData = folderList[index]
        return (
            <div style={props.style} key={props.key}>
                <Link to={"/" + folderData._id} key={folderData._id}>
                    <figure
                        className={"folderThumbnailItem " + (props.columnIndex == 0 ? "left" : "right")}>
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