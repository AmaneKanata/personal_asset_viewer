/* eslint-disable no-underscore-dangle */
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

function FolderThumbnail({ id, name }) {
  return (
    <div>
      <img
        src={`http://localhost:3000/${id}/thumbnail?index=0`}
        loading="lazy"
        alt=""
      />
      <figcaption className="item-name">
        <p>{name}</p>
      </figcaption>
    </div>
  )
}

FolderThumbnail.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

function FavoriteButton({ state, id, getFolderList }) {
  const onFavoriteButtonClicked = () => {
    axios
      .patch(`http://localhost:3000/${id}/favorite`, {
        target: !state,
      })
      .then(() => {
        getFolderList()
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
  getFolderList: PropTypes.func.isRequired,
}

function cellRendererWrapper({state, folderList, getFolderList, addSelectedFolder }) {
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
    const selectFolder = () => {
      console.log('select folder!!!!')
      addSelectedFolder(folderData._id)
    }
    return (
      <div style={style} key={key}>
        <figure
          className={`folderThumbnailItem ${
            columnIndex === 0 ? 'left' : 'right'
          }`}
          onClick={
            state === Configuration.STATE_DELETING ? selectFolder : undefined
          }
        >
          <FavoriteButton
            state={folderData.favorite}
            id={folderData._id}
            getFolderList={getFolderList}
          />
          {state === Configuration.STATE_NORMAL ? (
            <>
              <Link to={`/${folderData._id}`} key={folderData._id}>
                <FolderThumbnail id={folderData._id} name={folderData.name} />
              </Link>
            </>
          ) : (
            <FolderThumbnail id={folderData._id} name={folderData.name} />
          )}
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
            cellRenderer={cellRendererWrapper({
              state: props.state,
              folderList: props.folderList,
              getFolderList: props.getFolderList,
              addSelectedFolder: props.addSelectedFolder,
            })}
          />
        </div>
      )}
    </WindowScroller>
  )
}

FolderList.propTypes = {
  state: PropTypes.string.isRequired,
  folderList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFolderList: PropTypes.func.isRequired,
  addSelectedFolder: PropTypes.func.isRequired,
}

export default FolderList
