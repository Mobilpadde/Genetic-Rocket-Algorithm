Ship = function(location, maxAge, target){
    var _maxSpeed = 4,
        _maxForce = 0.05,

        _velocity = new Vector(),
        _acceleration = new Vector(),

        _genes = [];

    for(var i = 0; i < maxAge; i++){
        var angle = Math.random() * (Math.PI * 2);
        _genes[i] = new Vector(Math.sin(angle), Math.cos(angle)).multiply(Math.random() * _maxForce);
        if(i == 0) _genes[i].multiply(_maxForce * 2);
    }

    Object.defineProperties(this, {
        "target": {
            value: target,
            writable: true
        },
        "location": {
            value: location,
            writable: false
        },
        "velocity": {
            value: _velocity,
            writable: false
        },
        "acceleration": {
            value: _acceleration,
            writable: false
        },

        "currentAge": {
            value: 0,
            writable: true
        },
        "maxAge": {
            value: maxAge,
            writable: false
        },

        "maxSpeed": {
            value: _maxSpeed,
            writable: false
        },
        "maxForce": {
            value: _maxForce,
            writable: false
        },

        "genes": {
            value: _genes,
            writable: true
        },

        "stopped": {
            value: false,
            writable: true
        },
        "hitObstacle": {
            value: false,
            writable: true
        },
        "hitTarget": {
            value: false,
            writable: true
        }
    });
}

Ship.prototype = {
    crossover: function(partner){
        var child = new Ship(new Vector(250, 250), this.maxAge, this.target),
            midpoint = Math.random() * this.maxAge;

        for(var i in this.genes){
            if(i < midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }

        return child;
    },
    mutate: function(rate){
        for(var i in this.genes){
            if(Math.random() < rate){
                var angle = Math.random() * (Math.PI * 2);
                this.genes[i] = new Vector(Math.sin(angle), Math.cos(angle)).multiply(Math.random() * this.maxForce);
                if(i == 0) _genes[i].multiply(this.maxForce * 2);
            }
        }
    },
    hitTargetFn: function(target){
        if(!this.hitTarget){
            if(
                this.location.x < target.location.x + 5 &&
                this.location.x > target.location.x - 5 &&
                this.location.y < target.location.y + 5 &&
                this.location.y > target.location.y - 5
            ){
                this.hitTarget = true;
                this.stopped = true;
            }
        }
    },
    hitObstacleFn: function(obstacles){
        if(!this.hitObstacle){
            for(var i in obstacles){
                if(
                    this.location.x < obstacles[i].location.x + obstacles[i].width &&
                    this.location.x > obstacles[i].location.x &&
                    this.location.y < obstacles[i].location.y + obstacles[i].height &&
                    this.location.y > obstacles[i].location.y
                ){
                    this.hitObstacle = true;
                    this.stopped = true;
                }
            }
        }
    },
    fitness: function(){
        var dist = Vector.distance(this.location, this.target),
            fitn = Math.pow(1 / dist, 2);

        if(this.hitObstacle) fitn *= 0.1;
        if(this.hitTarget) fitn *= 2;

        return fitn;
    },
    applyForce: function(force){
        this.acceleration.add(force); // Maybe some mass
    },
    move: function(){
        if(!this.stopped && this.currentAge < this.maxAge){
            this.applyForce(this.genes[this.currentAge++]);
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);

            this.location.add(this.velocity);

            this.acceleration.multiply(0);

            this.location.x = Math.min(500, Math.max(0, this.location.x));
            this.location.y = Math.min(500, Math.max(0, this.location.y));
        }
    },
    draw: function(ctx){
        ctx.save();
        ctx.fillStyle = "hsla(" + (this.fitness() * 1000000) + ", 100%, 50%, 0.5)";
        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
