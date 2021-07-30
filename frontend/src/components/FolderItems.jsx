/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addFile, removeFile } from '../redux_modules/selectedFileList'
import Configuration from '../Configuration'
import '../css/thumbnailList.scss'

function FolderItems() {

  const dispatch = useDispatch()
  const { id, mode, selectedFileList } = useSelector(state => ({
    id: state.appState.data.folderId,
    mode: state.appState.mode,
    selectedFileList: state.selectedFileList.selectedFileList
  }))

  const [items, setItems] = useState([])

  const loadItems = () => {
    axios.get(`http://localhost:3000/${id}/Detail`).then((result) => {
      setItems([])
      setItems(result.data[0].items)
    })
  }

  useEffect(() => {
    if (id === undefined) {
      return
    }
    loadItems()
  }, [id, mode])

  const selectFile = (index) => (
    () => {
      if(selectedFileList.includes(index)) {
        dispatch(removeFile(index))
      } else {
        dispatch(addFile(index))
      }
    }
  )

  return (
    <div className="container-thumbnail">
      {items.map((item, index) => (
        <div className="item-thumbnail" key={item}
        onClick = {
          mode === Configuration.STATE_DELETING ? selectFile(index) : undefined
        }
        >
          {
            mode === Configuration.STATE_DELETING &&
            selectedFileList.includes(index) &&
            <img src="./checked.png" alt="" id="checkedMark" className="checked" />
          }
          {mode === Configuration.STATE_NORMAL ? (
            <Link
              to={{
                pathname: `/${id}/item`,
                state: {
                  currentIndex: index,
                  maxIndex: items.length,
                },
              }}
            >
              <img
                src={`http://localhost:3000/${id}/thumbnail?name=${item}`}
                loading="lazy"
                alt=""
              />
            </Link>
          ) : (
            <img
              src={`http://localhost:3000/${id}/thumbnail?name=${item}`}
              loading="lazy"
              alt=""
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default FolderItems
