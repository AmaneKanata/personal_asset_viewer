import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Grid, WindowScroller } from 'react-virtualized'
import PropTypes from 'prop-types'
import Configuration from '../Configuration'
import '../css/folderList.scss'

const windowWidth = Configuration.getWindowWidth()
let folderList

function cellRenderer({
  columnIndex, rowIndex, style, key
}) {
    const index = columnIndex + rowIndex * 2
  
    if (folderList === undefined) {
      return (
        <div style={style} key={key}>
          <p>loading...</p>
        </div>
      )
    }
    if (folderList[index] === undefined) {
      return <div style={style} key={key} />
    }
    const folderData = folderList[index]
    return (
      <div style={style} key={key}>
        <Link to={`/${folderData._id}`} key={folderData._id}>
          <figure
            className={`folderThumbnailItem ${
              columnIndex === 0 ? 'left' : 'right'
            }`}
          >
            <img src={folderData.thumbnail} loading="lazy" alt="" />
            <figcaption className="item-name">
              <p>{folderData.name}</p>
            </figcaption>
          </figure>
        </Link>
      </div>
    )
  }
  

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
          />
        </div>
      )}
    </WindowScroller>
  )
}

FolderList.propTypes = {
  folderList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default FolderList
