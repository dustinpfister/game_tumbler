var Tumbler = (function () {

    var Ring = function (obj) {

        obj = obj || {};

        this.ticks = 60;
        this.radius = obj.radius || 100;
        this.startTick = 0;
        this.goalTick = 30;
        this.dir = 1;

    };

    var state = {

        rings : [],
        current : {
            ring : 0,
            goalTick : 15,
            pos : 0
        }
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

        state.current.pos += ring.dir === 0 ? 1 : -1;

        //state.current.goalTick = ring.goalTick;

        if (state.current.pos >= ring.ticks) {

            state.current.pos = 0;

        }

        if (state.current.pos < 0) {

            state.current.pos = ring.ticks - 1;

        }

    };

    api.setup();

    return api;

}
    ());
