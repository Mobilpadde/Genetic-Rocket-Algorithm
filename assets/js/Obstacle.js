Obstacle = function(v, width, height){
    Object.defineProperties(this, {
        "location": {
            value: v,
            writable: false
        },
        "width": {
            value: width,
            writable: false
        },
        "height": {
            value: height,
            writable: false
        }
    });
}

Obstacle.prototype.draw = function(ctx){
    ctx.save();
    ctx.fillStyle = "rgba(125, 125, 125, 0.5)";
    ctx.strokeStyle = "rgba(55, 55, 55, 0.75)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.rect(this.location.x, this.location.y, this.width, this.height);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.restore();
}
