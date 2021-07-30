/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { setMode } from '../redux_modules/appState'
import Configuration from '../Configuration'
import '../css/menu.scss'

function Menu({ menuState, setMenuState }) {

  const dispatch = useDispatch()

  const onMenuClose = () => {
    setMenuState(false)
  }

  const onButtonClicked = () => {
    dispatch(setMode(Configuration.STATE_DELETING))
    setMenuState(false)
  }

  const menuList = (
    <div onClick={onButtonClicked}>
      <List>
        {['Delete'].map((listItemName) => (
          <ListItem button key={ListItem}>
            <ListItemText primary={listItemName} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Drawer anchor="left" open={menuState} onClose={onMenuClose}>
      {menuList}
    </Drawer>
  )
}

Menu.propTypes = {
  menuState: PropTypes.bool.isRequired,
  setMenuState: PropTypes.func.isRequired,
}

export default Menu
