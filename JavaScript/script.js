const drawElement = document.querySelector('canvas'),
draw = drawElement.getContext('2d'),
config = {
    touch: [],
    points: []
}

window.onload = ()=>{
    drawElement.width = innerWidth
    drawElement.height = innerHeight
    // 添加触屏事件
    drawElement.ontouchstart = (event)=>{getDrawStart(event)}
    drawElement.ontouchmove = (event)=>{getDrawMove(event)}
    // 线条初始化
    draw.lineWidth = 1
    draw.lineCap = 'round'
}

// 绘制头
function getDrawStart( event ) {
    if( event.targetTouches.length == 1 ) {
        let x = event.targetTouches[0].pageX,
        y = event.targetTouches[0].pageY
        //config.touch[0] = { x: x, y: y }
        // 重新记录采样点
        config.points = [{ x: x, y: y }]
    }
}

// 绘制中
function getDrawMove( event ) {
    event.preventDefault()
    if( event.targetTouches.length == 1 ) {
        let x = event.targetTouches[0].pageX,
        y = event.targetTouches[0].pageY
        /*
        // 旧版线条绘制方案，已舍弃
        draw.beginPath()
        draw.moveTo( config.touch[0].x, config.touch[0].y )
        draw.lineTo( x, y )
        draw.stroke()
        draw.closePath()
        config.touch[0] = { x: x, y: y }
        */
        // 记录采样点
        config.points.push({ x: x, y: y })
        const count = config.points.length
        if( count >= 3 ) {
            const point = config.points[count-1],
            point_start = config.points[count-3],
            point_control = config.points[count-2],
            point_end = {
                x: (point.x+point_control.x)*0.5,
                y: (point.y+point_control.y)*0.5
            }
            
            draw.beginPath()
            draw.moveTo( point_start.x, point_start.y )
            //draw.lineTo( x, y )
            //绘制二次贝塞尔曲线
            draw.quadraticCurveTo( point_control.x, point_control.y, point_end.x, point_end.y )
            draw.stroke()
            draw.closePath()
            
            // 将控制点替换为计算点
            config.points[count-2] = point_end
        }
    }
}

// 绘制尾
function getDrawEnd( event ) {
    //
}