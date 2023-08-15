import React, { LegacyRef, useEffect, useRef } from 'react'
import './gameState.pcss'
import playCame from '../../../core/game/game'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { toggleFullscreen } from '../../../utils/Fullscreen'

export type GameCanvasProps = {
  isFullscreen?: boolean
}
const GameCanvas: React.FC<GameCanvasProps> = (props: GameCanvasProps) => {
  const { id, login } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    playCame({ id: id, login: login })
  }, [])

  const handleDirection = (direction: string) => {
    const arrow = new KeyboardEvent('keydown', { key: direction })
    window.dispatchEvent(arrow)
  }
  const modifyClassFS = (className: string, isFS: boolean | undefined) =>
    `${className}${isFS ? '_fullscreen' : ''}`

  const gameElement: React.MutableRefObject<HTMLElement | undefined> = useRef()
  const handler = () => {
    toggleFullscreen(gameElement?.current)
  }

  return (
    <div ref={gameElement as LegacyRef<HTMLDivElement>} className="wrapper">
      <div className={modifyClassFS('game', props.isFullscreen)}>
        <canvas
          id="info"
          className={modifyClassFS('game__info', props.isFullscreen)}
          data-testid="info"
          width="600"
          height="30"></canvas>
        <canvas
          id="board"
          className={modifyClassFS('game__board', props.isFullscreen)}
          data-testid="board"
          width="896"
          height="992"></canvas>
      </div>
      <br></br>
      <div className="mobile-controls">
        <img
          src="./images/dpad.png"
          alt="dpad"
          useMap="#dpad"
          height="200px"
          width="200px"
          data-testid="dpad"></img>
        <map name="dpad" data-testid="dpad-map">
          <area
            className="up"
            data-testid="up"
            shape="rect"
            coords="66,0,133,66"
            alt="up"
            onClick={() => handleDirection('ArrowUp')}></area>
          <area
            className="left"
            data-testid="left"
            shape="rect"
            coords="0,66,66,133"
            alt="left"
            onClick={() => handleDirection('ArrowLeft')}></area>
          <area
            className="right"
            data-testid="right"
            shape="rect"
            coords="133,66,200,133"
            alt="right"
            onClick={() => handleDirection('ArrowRight')}></area>
          <area
            className="down"
            data-testid="down"
            shape="rect"
            coords="66,133,133,200"
            alt="down"
            onClick={() => handleDirection('ArrowDown')}></area>
        </map>
      </div>
      <button onClick={handler} className={'fullscreen-button'}>
        {props.isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      </button>
    </div>
  )
}

export default GameCanvas