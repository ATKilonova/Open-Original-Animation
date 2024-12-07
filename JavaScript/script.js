const canvasDOM = document.querySelector('canvas'),
canvas = canvasDOM.getContext('2d'),
config = {
  touch: []
}

window.onload = ()=>{
  canvasDOM.width = innerWidth
  canvasDOM.height = innerHeight
}

canvasDOM.ontouchstart = (event)=>{
  if( event.targetTouches.length == 1 ) {
    let x = event.targetTouches[0].pageX,
    y = event.targetTouches[0].pageY
    config.touch[0] = { x: x, y: y }
  }
}

canvasDOM.ontouchmove = (event)=>{
  event.preventDefault()
  if( event.targetTouches.length == 1 ) {
    let x = event.targetTouches[0].pageX,
    y = event.targetTouches[0].pageY
    canvas.beginPath()
    canvas.moveTo( config.touch[0].x, config.touch[0].y )
    canvas.lineTo( x, y )
    canvas.stroke()
    canvas.closePath()
    config.touch[0] = { x: x, y: y }
  }
}
