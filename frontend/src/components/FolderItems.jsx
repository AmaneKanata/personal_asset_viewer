/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Configuration from '../Configuration'
import '../css/thumbnailList.scss'

function FolderItems({
  data: { id },
  state,
  selectedFileList,
  addSelectedFile,
  removeSelectedFile,
}) {
  const [items, setItems] = useState([])

  const loadItems = () => {
    axios.get(`http://localhost:3000/${id}/Detail`).then((result) => {
      setItems(result.data[0].items)
    })
  }

  useEffect(() => {
    if (id === undefined) {
      return
    }
    loadItems()
  }, [id, state])

  const selectFile = (index) => (
    () => {
      if(selectedFileList.includes(index)) {
        removeSelectedFile(index)
      } else {
        addSelectedFile(index)
      }
    }
  )

  return (
    <div className="container-thumbnail">
      {items.map((item, index) => (
        <div className="item-thumbnail" key={item}
        onClick = {
          state === Configuration.STATE_DELETING ? selectFile(index) : undefined
        }
        >
          {
            state === Configuration.STATE_DELETING &&
            selectedFileList.includes(index) &&
            <img src="./checked.png" alt="" id="checkedMark" className="checked" />
          }
          {state === Configuration.STATE_NORMAL ? (
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
                src={`http://localhost:3000/${id}/thumbnail?index=${index}`}
                alt=""
              />
            </Link>
          ) : (
            <img
              src={`http://localhost:3000/${id}/thumbnail?index=${index}`}
              alt=""
            />
          )}
        </div>
      ))}
    </div>
  )
}

FolderItems.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  state: PropTypes.string.isRequired,
  selectedFileList: PropTypes.arrayOf(PropTypes.number).isRequired,
  addSelectedFile: PropTypes.func.isRequired,
  removeSelectedFile: PropTypes.func.isRequired,
}

export default FolderItems
