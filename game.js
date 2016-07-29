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
	
	var btnStart = new buttonObj(157,315,228,150);

	//variable img
	var img = new Image();
	img.src = 'menu.png';
	img.addEventListener('load',init,false);

	//variable mouse
	var mouseX = 0;
	var mouseY = 0;

	//Variable para puntos
	var score = 0;

	//Propiedades de movimiento

	var x = canvas.width /2;
	var y = canvas.height -30;
	var dx = 2;
	var dy = -2;
	var ballRadius = 5;

	// Variables de la paleta
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.height - paddleWidth)/2;

	//Variables de control
	var rightPressed = false;
	var leftPressed = false;

	// Variables de enemigos
	var brickRowCount = 4;
	var brickColumnCount = 11;
	var brickWidth = 33;
	var brickHeight = 10;
	var brickPadding = 6;
	var brickOffserTop = 30;
	var brickOffserLeft = 30;

	var bricks = [];

	function init(){
		drawMenu();
		document.addEventListener('click', mouseClicked, false);

	};

	for (var col = 0; col < brickColumnCount; col++) {
		bricks[col] = [] //para hacer una matriz
		for (var row = 0; row < brickRowCount; row++) {
			bricks[col][row] = {x: 0, y: 0, status: 1};
		};
	};

	function playGame(){
		draw();
		document.addEventListener('keydown', keydownHandler, false);
		document.addEventListener('keyup', keyupHandler, false);
		document.addEventListener('mousemove', mouseMoveHandler, false);

	};

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

	function drawBricks () {
		for (var col = 0; col < brickColumnCount; col++) {
			for (var row = 0; row < brickRowCount; row++) {
				if (bricks[col][row].status == 1) {
					var brickX = (col * (brickWidth + brickPadding)) + brickOffserLeft;
					var brickY = (row * (brickHeight + brickPadding)) + brickOffserTop;
					bricks[col][row].x = brickX;
					bricks[col][row].y = brickY;
					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fillStyle = "#0095DD";
					ctx.fill();
					ctx.closePath();
				};
			};
		};
	}

	function drawScore () {
		ctx.font = '16px Arial';
		ctx.fillStyle = '#0095DD';
		ctx.fillText('Score: ' + score, 8, 20);
	}

	function drawMenu(){
		ctx.drawImage(img,0,0,480,320,0,0,480,320)
	}

	//button object
	function buttonObj(xL,xR,yT,yB){
		this.xLeft = xL;
		this.xRight = xR;
		this.yTop = yT;
		this.yBottom = yB;
	}

	buttonObj.prototype.checkClicked = function(){
		if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) {
			return true;
		};
	}

	function keydownHandler(e){
		if (e.keyCode == 39) {
			rightPressed = true;
		}else if (e.keyCode == 37){
			leftPressed = true;
		}
	}

	function keyupHandler(e){ //e va a tener el puntero del mouse
		if (e.keyCode == 39) {
			rightPressed = false;
		}else if (e.keyCode == 37){
			leftPressed = false;
		}	
	}

	function mouseMoveHandler(e){
		var relativeX = e.clientX - canvas.offsetLeft;
		if (relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth / 2;
		};
	}

	function mouseClicked(e){
		mouseX = e.pageX - canvas.offsetLeft;
		mouseY = e.pageY - canvas.offsetTop;
		if (btnStart.checkClicked()) {
			playGame();
		}

	}

	function collisionDetection () {
		for (var col = 0; col < brickColumnCount; col++) {
			for (var row = 0; row < brickRowCount; row++) {
				var brick = bricks[col][row];
				if (brick.status == 1) {
					if (x > brick.x && x < brick.x + brickWidth && brick.y && y < brick.y + brickHeight) {
					dy = -dy;
					brick.status = 0;
					score++;
					if (score == brickRowCount * brickColumnCount) {
						ctx.textAlign = "center";
						ctx.fillText("Congratulations You Win!",157, 228);
						document.location.reload();
					};
					};
				};
			};
		};
	}

	function draw () {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawBricks();
		drawBall();
		drawPaddle();
		drawScore();
		collisionDetection();
		//colision top
		// if (y + dy < 0) {
		// 	dy = -dy;
		// };
		//colision bot
		// if (y + dy > canvas.height) {
		// 	dy = -dy;
		// };
		// 
		// if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
		// 	dy = -dy;
		// };
		if (y + dy < ballRadius) {
			dy = -dy;
		}else if (y + dy > canvas.height - ballRadius) {
			if (x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
			}else{
				ctx.textAlign = "center";
				ctx.fillText("Game Over!",157, 228);
				document.location.reload();
			}
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
	//setInterval(init, 10); //1000 / 60 refrescar
}())

