import React, { useState } from 'react'
import PropTypes from 'prop-types'

function makeQueryData(queryString) {
  if (queryString === '') {
    return {}
  }
  return {
    name: queryString
  }
}

function Search({setQueryData, moveScrolltoTop}) {
  const [queryString, setQueryString] = useState('')

  const handleChange = ({ target: { value } }) => setQueryString(value)

  const handleSubmit = (event) => {
    event.preventDefault()
    setQueryData(makeQueryData(queryString))
    moveScrolltoTop()
    setQueryString("")
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="input" value={queryString} onChange={handleChange} className="text_input" placeholder="Search..."/>
        <button type="submit" className="search_button" >
          <img src="./search.png" alt="" />
        </button>
      </form>
    </div>
  )
}

Search.propTypes = {
  setQueryData: PropTypes.func.isRequired,
  moveScrolltoTop: PropTypes.func.isRequired
}

export default Search
