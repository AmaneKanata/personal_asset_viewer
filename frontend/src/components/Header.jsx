import React from 'react'
import PropTypes from 'prop-types'
import Search from './Search'
import FavoriteButton from './FavoriteButton'
import '../css/header.scss'

function Header({ setQueryData }) {

    return (
        <div className="header">
            <Search setQueryData={setQueryData}/>
            <FavoriteButton setQueryData={setQueryData}/>
        </div>
    )
}

Header.propTypes = {
    setQueryData: PropTypes.func.isRequired
}

export default Header