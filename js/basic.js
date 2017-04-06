(function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    // append to body
    document.body.appendChild(canvas);

    // set size, and default to a solid background
    canvas.width = 320;
    canvas.height = 240;

    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var draw = function () {

        var tumb = Tumbler(),
        radian,
        ring = tumb.rings[tumb.current.ring];

        // clear
        ctx.fillStyle = tumb.gameOver ? tumb.loose ? '#af0000' : '#00af00' : '#2a2a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw rings
        tumb.rings.forEach(function (ring, index) {

            ctx.strokeStyle = '#ffffff';

            if (tumb.current.ring === index) {

                ctx.strokeStyle = '#ffff00';

            }

            // draw the circle
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(160, 120, ring.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();

        });

        // draw pointer
        radian = Math.PI * 2 / ring.ticks * tumb.current.pos;

        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(
            160 + Math.cos(radian) * ring.radius,
            120 + Math.sin(radian) * ring.radius,
            5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        // draw goal
        radian = Math.PI * 2 / ring.ticks * tumb.current.goalTick;

        ctx.strokeStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(
            160 + Math.cos(radian) * ring.radius,
            120 + Math.sin(radian) * ring.radius,
            5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

    },

    update = function () {

        //requestAnimationFrame(update);

        setTimeout(update, 33);

        Tumbler.update();

        draw();

    };

    canvas.addEventListener('click', function (e) {

        Tumbler.userAction();

        console.log('test');

    });

    update();

}
    ());
