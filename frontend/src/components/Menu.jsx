/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { setMode } from '../redux_modules/appState'
import Configuration from '../Configuration'
import '../css/menu.scss'

function Menu({ menuState, setMenuState}) {

  const dispatch = useDispatch()
  const { scene } = useSelector((state) => ({
    scene: state.appState.scene,
  }))

  const onMenuClose = () => {
    setMenuState(false)
  }

  const folderListMenu = ['Delete', 'Upload']
  const folderDetailMenu = ['Delete', 'Detail']

  let menuContent

  switch (scene) {
    case Configuration.SCENE_FOLDER_LIST:
      menuContent = folderListMenu
      break
    case Configuration.SCENE_FOLDER_DETAIL:
      menuContent = folderDetailMenu
      break
    default:
      break
  }

  const onButtonClicked = (listItemName) => () => {
    if (scene === Configuration.SCENE_FOLDER_LIST) {
      switch (listItemName) {
        case 'Delete':
          dispatch(setMode(Configuration.STATE_DELETING))
          break
        case 'Upload':
          console.log("upload")
          break
        default:
          break
      }
    } else if (scene === Configuration.SCENE_FOLDER_DETAIL) {
      switch (listItemName) {
        case 'Delete':
          dispatch(setMode(Configuration.STATE_DELETING))
          break
        default:
          break
      }
    }

    setMenuState(false)
  }

  const menuList = (
    <List>
      {menuContent.map((listItemName) => (
        <ListItem
          button
          onClick={onButtonClicked(listItemName)}
          key={listItemName}
        >
          <ListItemText primary={listItemName} />
        </ListItem>
      ))}
    </List>
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
