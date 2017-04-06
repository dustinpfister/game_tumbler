var Tumbler = (function () {

    var Ring = function (obj) {

        obj = obj || {};

        this.ticks = obj.ticks || 120;
        this.radius = obj.radius || 100;
        this.startTick = obj.startTick || 0;
        this.goalTick = obj.goalTick || 30;
        this.dir = obj.dir || 0;

    };

    // tick count from the goal to the given tick position
    Ring.prototype.fromPos = function (pos) {

        var d1 = Math.abs(this.goalTick - pos),
        d2 = this.ticks - d1;

        return d1 < d2 ? d1 : d2;

    };

    var state = {

        rings : [],
        current : {
            ring : 0,
            goalTick : 15,
            pos : 0,
            tolerance : 3
        },
        gameOver : false,
        canLoose : false,
        loose : false,
        nextRing : false // to next ring?

    },

    api = function () {

        return state;

    };

    var rndRing = function (radius) {

        var ticks = 180,
        startPos = Math.floor(Math.random() * 180),
        goalTick = Math.floor(startPos + ticks / 2);

        if (goalTick > ticks) {

            goalTick -= ticks;

        }

        return new Ring({

            ticks : ticks,
            startTick : startPos,
            goalTick : goalTick,
            radius : radius

        });

    };

    api.setup = function () {

        state.rings = [];
        state.rings.push(rndRing(100));
        state.rings.push(rndRing(40));
        state.rings.push(rndRing(20));
        state.rings.push(rndRing(10));

    };

    // a user action has occurred.
    api.userAction = function () {

        var ring = state.rings[state.current.ring],

        fromGoal = ring.fromPos(state.current.pos)

            console.log();

        // user action will result in gameOver
        //state.gameOver = true;
        state.nextRing = true;

        state.loose = true;
        if (fromGoal <= state.current.tolerance) {

            state.loose = false;

        }

    };

    var playCurrentRing = function () {

        var ring = state.rings[state.current.ring];

        state.current.pos += ring.dir === 0 ? 1 : -1;

        state.current.goalTick = ring.goalTick;

        if (state.current.pos >= ring.ticks) {

            state.current.pos = 0;

        }

        if (state.current.pos < 0) {

            state.current.pos = ring.ticks - 1;

        }

        if (ring.fromPos(state.current.pos) <= state.current.tolerance) {

            state.canLoose = true;

        } else {

            if (state.canLoose) {

                state.gameOver = true;
                state.loose = true;

            }

        }

    },

    // to next ring
    toNextRing = function () {

        var ring = state.rings[state.current.ring],

        nextRing;

        console.log('yes');

        if (state.current.ring < state.rings.length - 1) {

            nextRing = state.rings[state.current.ring + 1];

            ring.radius += 15;
            nextRing.radius += 5;

            if (nextRing.radius >= 100) {

                state.current.pos = nextRing.startTick;

                state.current.ring += 1;
                state.nextRing = false;
                state.canLoose = false;

            }

        } else {

            state.gameOver = true;

        }

    };

    api.update = function () {

        if (!state.gameOver) {

            if (state.nextRing) {

                toNextRing();

            } else {

                playCurrentRing();

            }

        }

    };

    api.setup();

    return api;

}
    ());
