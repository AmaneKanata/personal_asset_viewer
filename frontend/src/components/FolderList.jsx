/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Grid, WindowScroller } from 'react-virtualized'
import PropTypes from 'prop-types'
import axios from 'axios'
import Configuration from '../Configuration'
import '../css/folderList.scss'

const windowWidth = Configuration.getWindowWidth()

function FavoriteButton({ state, id, getListData }) {

  const onFavoriteButtonClicked = () => {
    axios.patch(`http://localhost:3000/${id}/favorite`, {
      target: !state
    }).then(() => {
      getListData()
    })
  }

  return (
    <img
      src="./favorite.png"
      alt=""
      className={`favorite_button ${state ? '' : 'not_favorite'}`}
      onClick={onFavoriteButtonClicked}
    />
  )
}

FavoriteButton.propTypes = {
  state: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  getListData: PropTypes.func.isRequired
}

function cellRendererWrapper(folderList, getListData) {
  return function cellRenderer({ columnIndex, rowIndex, style, key }) {
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
        <figure
          className={`folderThumbnailItem ${
            columnIndex === 0 ? 'left' : 'right'
          }`}
        >
          <FavoriteButton state={folderData.favorite} id={folderData._id} getListData={getListData} />
          <Link to={`/${folderData._id}`} key={folderData._id}>
            <img
              src={`http://localhost:3000/${folderData._id}/thumbnail?index=0`}
              loading="lazy"
              alt=""
            />
            <figcaption className="item-name">
              <p>{folderData.name}</p>
            </figcaption>
          </Link>
        </figure>
      </div>
    )
  }
}

function FolderList(props) {
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
            cellRenderer={cellRendererWrapper(props.folderList, props.getListData)}
          />
        </div>
      )}
    </WindowScroller>
  )
}

FolderList.propTypes = {
  folderList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getListData: PropTypes.func.isRequired
}

export default FolderList
