(function () {
	var canvas = document.getElementById('gameCanvas');
	var ctx = canvas.getContext('2d');
//primer ejemplo de dibujos de canvas

	// ctx.beginPath(); //ok, voy a dibujar
	// ctx.rect(20,40,50, 50) //Escribir una recta
	// ctx.fillStyle = "#FF0000";
	// ctx.fill(); // pinte con el color anterior y haga esas cordenadas(agregue o haga lo que dije antes)
	// ctx.closePath();

	// ctx.beginPath();
	// ctx.arc(240, 160, 20, 0, Math.PI*2, false); //hacer un circulo o semi sirculo segun las cordenadas.
	// ctx.fillStyle = "green";
	// ctx.fill();
	// ctx.closePath();

	// ctx.beginPath(); 
	// ctx.rect(160,10,100,40) 
	// ctx.strokeStyle = "rgba(0,0,255,0.5)"; //solo hace la linea no lo rellena.
	// ctx.stroke(); 
	// ctx.closePath();

//Propiedades de movimiento

	var x = canvas.width /2;
	var y = canvas.height -30;
	var dx = 2;
	var dy = -2;
	var ballRadius = 10;

	// Variables de la paleta
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.height - paddleWidth)/2;

	//Variables de control
	var rightPressed = false;
	var leftPressed = false;

	document.addEventListener('keydown', keydownHandler, false);
	document.addEventListener('keyup', keyupHandler, false);

	function drawBall () {
		ctx.beginPath(); 
		ctx.arc(x,y,ballRadius,0, Math.PI*2) ;
		ctx.fillStyle = "#0095DD"; //solo hace la linea no lo rellena.
		ctx.fill(); 
		ctx.closePath();
	};

	function drawPaddle(){
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

	function keydownHandler(e){
		if (e.keyCode == 39) {
			rightPressed = true;
		}else if (e.keyCode == 37){
			leftPressed = true;
		}
	}

	function keyupHandler(e){
		if (e.keyCode == 39) {
			rightPressed = false;
		}else if (e.keyCode == 37){
			leftPressed = false;
		}	
	}

	function draw () {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawBall();
		drawPaddle();
		//colision top
		// if (y + dy < 0) {
		// 	dy = -dy;
		// };
		//colision bot
		// if (y + dy > canvas.height) {
		// 	dy = -dy;
		// };
		// 
		if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
			dy = -dy;
		};
		if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
			dx = -dx;
		};

		if (rightPressed && paddleX < canvas.width - paddleWidth) {
			paddleX += 7;
		};
		if (leftPressed && paddleX > 0) {
			paddleX -= 7;
		};

		x += dx;
		y += dy;
	};
	setInterval(draw, 10); //1000 / 60 refrescar
}())

