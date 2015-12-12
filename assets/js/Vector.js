Vector = function(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype = {
    add: function(v){
        this.x += v.x;
        this.y += v.y;

        return this;
    },

    multiply: function(s){
        this.x *= s;
        this.y *= s;

        return this;
    },

    divide: function(v){
        if(v instanceof Vector){
            this.x /= v.x;
            this.y /= v.y;
        }else{
            this.x /= v;
            this.y /= v;
        }

        return this;
    },

    dot: function(v){
        return this.x * v.x + this.y * v.y;
    },

    length: function(){
        return Math.sqrt(this.dot(this));
    },

    normalize: function(){
        return this.divide(this.length());
    },

    magSq: function(){
        return this.x * this.x + this.y * this.y;
    },

    limit: function(n){
        var magSq = this.magSq();
        if(magSq > n * n){
            this.divide(Math.sqrt(magSq));
            this.multiply(n);
        }

        return this;
    },

    copy: function(){
        return JSON.parse(JSON.stringify(this));
    }
}

Vector.random = function(){
    return new Vector(Math.random() * (2 - -2) + -2, Math.random() * (2 - -2) + -2);
}

Vector.distance = function(a, b){
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

Vector.substract = function(a, b){
    return new Vector(a.x - b.x, a.y - b.y);
}
