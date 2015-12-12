$(document).ready(function(){
    $("#board")[0].width = 500;
    $("#board")[0].height = 500;

    var ctx = $("#board")[0].getContext("2d"),
        target = new Target(250, 100),
        ships = [],
        obstacles = [],
        matingPool = [],
        maxAge = 750,
        currentAge = 1,
        generation = 0,
        mutationRate = 0.01,

        map = function(n, start1, stop1, start2, stop2){
            return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
        },
        selection = function(){
            matingPool = [];

            var max = 0;
            for(var i in ships){
                if(ships[i].fitness() > max) max = ships[i].fitness();
            }

            for(var i in ships){
                var fitnessNormal = map(ships[i].fitness(), 0, max, 0, 1),
                    n = fitnessNormal * 100;

                for(var j = 0; j < n; j++){
                    matingPool.push(ships[i]);
                }
            }
        },
        reproduce = function(){
            selection();

            var shipsCopy = JSON.parse(JSON.stringify(ships));
            for(var i in shipsCopy){
                var mom = matingPool[~~(Math.random() * matingPool.length)],
                    dad = matingPool[~~(Math.random() * matingPool.length)],
                    child = mom.crossover(dad);

                child.mutate(mutationRate);

                ships[i] = child;
            }

            $("#generation").text(++generation);
        }

    for(var i = 0; i < 10; i++){
        ships.push(new Ship(new Vector(250, 250), maxAge, target.location));
    }

    obstacles.push(new Obstacle(new Vector(220, 170), 60, 10));

    var fitness;
    setInterval(function(){
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 500, 500);

        target.draw(ctx);

        fitness = 0;
        for(var i in ships){
            ships[i].hitTargetFn(target);
            ships[i].hitObstacleFn(obstacles);
            ships[i].move();
            ships[i].draw(ctx);
            fitness += ships[i].fitness();
        }
        $("#fitness").text(fitness / ships.length);
        $("#age").text(currentAge % maxAge);

        for(var i in obstacles) obstacles[i].draw(ctx);

        if(currentAge++ % maxAge == 0){
            reproduce();
        }
    }, 1000 / 30);
});
