import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/thumbnailList.scss'

function FolderItems({
  data : {
    id
  }
}) {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (id === undefined) {
      return
    }
    axios
      .get(`http://localhost:3000/${id}/Detail`)
      .then((result) => {
        setItems(result.data[0].items)
      })
  }, [id])

  return (
    <div className="container-thumbnail">
      {items.map((item, index) => (
        <div className="item-thumbnail" key={index}>
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
        </div>
      ))}
    </div>
  )
}

FolderItems.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
}

export default FolderItems
