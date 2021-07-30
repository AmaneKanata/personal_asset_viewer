import React, { useEffect, useRef } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setScene } from '../redux_modules/appState'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../css/item.scss'
import Configuration from '../Configuration'

function Item(props) {
  const dispatch = useDispatch()

  const slider = useRef()

  useEffect(() => {
    dispatch(setScene(Configuration.SCENE_ITEM))
    slider.current.slickGoTo(props.location.state.currentIndex, true)
  }, [])

  const getSliderComponent = () =>
    [...Array(props.location.state.maxIndex)].map((e, index) => (
      <div key={props.match.params.id}>
        <img
          src={`http://localhost:3000/${props.match.params.id}/item?index=${index}`}
          alt=""
          // loading="lazy"
          className="page"
        />
      </div>
    ))

  return (
    <div>
      <Slider
        infinite={false}
        lazyLoad="progressive"
        arrows={false}
        ref={slider}
        className="slider"
      >
        {getSliderComponent()}
      </Slider>
    </div>
  )
}

Item.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      currentIndex: PropTypes.number,
      maxIndex: PropTypes.number,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default Item
