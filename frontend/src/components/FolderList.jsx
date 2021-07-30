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
import { loadFolderList } from '../redux_modules/folderList'
import { addFolder, removeFolder } from '../redux_modules/selectedFolderList'
import { setFolder, setScene } from '../redux_modules/appState'

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

function FavoriteButton({ state, id }) {
  const dispatch = useDispatch()

  const onFavoriteButtonClicked = () => {
    axios
      .patch(`http://localhost:3000/${id}/favorite`, {
        target: !state,
      })
      .then(() => {
        dispatch(loadFolderList())
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
}

function cellRendererWrapper({
  dispatch,
  appState,
  folderList,
  selectedFolderList,
}) {
  return function cellRenderer({ columnIndex, rowIndex, style, key }) {
    const state = appState.mode
    const index = columnIndex + rowIndex * 2

    if (folderList === undefined) {
      return (
        <div style={style} key={key}>
          <p>loading...</p>
        </div>
      )
    }

    if (folderList[index] === undefined) {
      return  (
        <div style={style} key={key}>
          <p>loading...</p>
        </div>
      )
    }

    const folderData = folderList[index]

    const selectFolder = () => {
      if (selectedFolderList.includes(folderData._id)) {
        dispatch(removeFolder(folderData._id))
      } else {
        dispatch(addFolder(folderData._id))
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

function FolderList() {
  const dispatch = useDispatch()
  const { queryData, folderList, appState, selectedFolderList } = useSelector(
    (state) => ({
        queryData: state.query.queryData,
        folderList: state.folderList.folderList,
        appState: state.appState,
        selectedFolderList: state.selectedFolderList.selectedFolderList,
      })
  )

  useEffect(() => {
    dispatch(setFolder(undefined))
    dispatch(setScene(Configuration.SCENE_FOLDER_LIST))
    dispatch(loadFolderList(queryData))
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
              dispatch,
              appState,
              folderList,
              selectedFolderList,
            })}
          />
        </div>
      )}
    </WindowScroller>
  )
}

export default FolderList
