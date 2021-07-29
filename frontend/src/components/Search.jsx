import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import queryManger from '../redux_modules/query'

function makeQueryData(queryString) {
  if (queryString === '') {
    return {}
  }
  return {
    name: queryString,
  }
}

function Search({ moveScrolltoTop }) {

  const dispatch = useDispatch()

  const [queryString, setQueryString] = useState('')

  const handleChange = ({ target: { value } }) => setQueryString(value)

  const handleSubmit = (event) => {
    event.preventDefault()
    const queryData = makeQueryData(queryString)
    dispatch(queryManger.setQueryData(queryData))
    moveScrolltoTop()
    setQueryString('')
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="input"
          value={queryString}
          onChange={handleChange}
          className="text_input"
          placeholder="Search..."
        />
        <button type="submit" className="search_button">
          <img src="./search.png" alt="" />
        </button>
      </form>
    </div>
  )
}

Search.propTypes = {
  moveScrolltoTop: PropTypes.func.isRequired,
}

export default Search
