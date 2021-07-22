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

function Search(props) {
  const [queryString, setQueryString] = useState('')

  const handleChange = ({ target: { value } }) => setQueryString(value)

  const handleSubmit = (event) => {
    event.preventDefault()
    props.setQueryData(makeQueryData(queryString))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={queryString} onChange={handleChange} />
        <button type="submit">search</button>
      </form>
    </div>
  )
}

Search.propTypes = {
  setQueryData: PropTypes.func.isRequired,
}

export default Search
