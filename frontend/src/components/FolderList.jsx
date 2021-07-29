/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Grid, WindowScroller } from 'react-virtualized'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import Configuration from '../Configuration'
import '../css/folderList.scss'
import folderListManager from '../redux_modules/folderList'

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

function cellRendererWrapper({
  state,
  folderList,
  addSelectedFolder,
  removeSelectedFolder,
  selectedFolderList,
}) {
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
      if (selectedFolderList.includes(folderData._id)) {
        removeSelectedFolder(folderData._id)
      } else {
        addSelectedFolder(folderData._id)
      }
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
          {state === Configuration.STATE_DELETING &&
            selectedFolderList.includes(folderData._id) && (
              <img
                src="./checked.png"
                alt=""
                id="checkedMark"
                className="checked"
              />
            )}
          {state === Configuration.STATE_NORMAL && (
            <FavoriteButton state={folderData.favorite} id={folderData._id} />
          )}
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
  const dispatch = useDispatch()
  const { queryData, folderList } = useSelector((state) => {

    console.log(state)
    return {
      queryData: state.query.queryData,
      folderList: state.folderList.folderList
    }
  })

  useEffect(() => {
    if(queryData === undefined) {
      return
    }
    console.log(queryData)
    dispatch(folderListManager.loadFolderList(queryData))
  }, [queryData])

  return (
    <WindowScroller>
      {({ height, registerChild, isScrolling, scrollTop }) => (
        <div ref={registerChild}>
          <Grid
            autoHeight
            height={height}
            width={windowWidth}
            columnCount={Configuration.columnNumber}
            rowCount={
              folderList !== undefined ? Math.ceil(folderList.length / 2) : 0
            }
            columnWidth={windowWidth / 2}
            rowHeight={windowWidth / 2}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
            onScroll={() => {}}
            cellRenderer={cellRendererWrapper({
              state: props.state,
              folderList,
              addSelectedFolder: props.addSelectedFolder,
              removeSelectedFolder: props.removeSelectedFolder,
              selectedFolderList: props.selectedFolderList,
            })}
          />
        </div>
      )}
    </WindowScroller>
  )
}

FolderList.propTypes = {
  state: PropTypes.string.isRequired,
  addSelectedFolder: PropTypes.func.isRequired,
  removeSelectedFolder: PropTypes.func.isRequired,
  selectedFolderList: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default FolderList
