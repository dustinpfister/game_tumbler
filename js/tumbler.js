var Tumbler = (function () {

    var Ring = function (obj) {

        obj = obj || {};

        this.ticks = 60;
        this.radius = obj.radius || 100;
        this.startTick = 0;
        this.goalTick = 10;
        this.dir = 0;

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
        canLoose : false

    },

    api = function () {

        return state;

    };

    api.setup = function () {

        state.rings = [];
        state.rings.push(new Ring());
        state.rings.push(new Ring({
                radius : 50
            }));

    };

    api.update = function () {

        var ring = state.rings[state.current.ring];

        if (!state.gameOver) {

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

                }

            }

            console.log();

        }

    };

    api.setup();

    return api;

}
    ());
