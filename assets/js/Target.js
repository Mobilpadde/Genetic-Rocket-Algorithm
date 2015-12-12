Target = function(x, y){
    var _location = new Vector(x || Math.random() * 500, y || Math.random() * 500);

    Object.defineProperties(this, {
        "location": {
            value: _location,
            writable: false
        }
    });
}

Target.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.location.x, this.location.y);

    ctx.strokeStyle = "#fffeef";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(0, 5);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(5, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
}
