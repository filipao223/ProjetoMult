"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

var stage;
var stageBack;

var container;

var canvas;
var canvas2;
var currentWindow;

var img_blue_source;
var img_red_source;
var img_ball_source;

var img_blue;
var img_red;
var img_ball;
var backBit; //Bitmaps
var blueBit;
var redBit;
var ballBit;

var powerTimeBlue;
var powerTimeRed;

var stopBlue;
var stopRed;

var powerBlue;
var powerRed;

var xposBlue;
var yposBlue;

var currentPower; //1-velocidade, 2-..., 3-...

var speedBlue=5;
var speedRed=5;
var speedBlueCollision = 2;
var speedRedCollision = 2;

var xposRed;
var yposRed;

var xposBall;
var yposBall;

var boundaryLeft;
var boundaryRight;

var i_width;
var i_height;

var intervalmoveLeftBlue = -1;
var intervalUpArrowBlue = -1;
var intervalRightArrowBlue = -1;
var intervalMoveDownBlue = -1;

var intervalmoveLeftRed = -1;
var intervalUpArrowRed = -1;
var intervalRightArrowRed = -1;
var intervalMoveDownRed = -1;


var jumpSizeBlue; //A altura do salto
var jumpMaxBlue = 16;

var jumpSizeRed; //A altura do salto
var jumpMaxRed = 16;

var yGround;

var frameRate = 1000/30;

var progressBarEmptyBlue = -1;
var progressBarEmptyRed = -1;
var progressBarFillBlue = -1;
var progressBarFillRed = -1;
var widthProgressBarBlue = 0;
var widthProgressBarRed = 0;

function main(){

	xposBlue = 850;
	yposBlue = 360;
	xposRed = 50;
	yposRed = 360;
  xposBall = 400;
  yposBall = 525;

	powerRed = 0;
	powerBlue = 0;

	yGround = yposBlue;

	i_width = 75;
	i_height = 75;

	currentWindow = document.defaultView;
	//Escolha dos carateres
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	var queries = queryString.split("&");

	var destiny = "menu.html" + "?" + queries[0] + "&" + queries[1];

	setTimeout(function(){window.location.href="../html/resultado.html" + "?" + queries[0] + "&" + queries[1]},300000);

	audio1.volume = 0.3;

	if(queries[1] == 0){
		audio1.volume =0;
	}

	img_blue_source = "../resources/images/blueTeam/char"+queries[3]+"_blue.png";
	img_red_source = "../resources/images/redTeam/char"+queries[2]+"_red.png";
  img_ball_source = "../resources/images/smallBall.png";
	img_blue = new Image();
	img_red = new Image();
  img_ball = new Image();
	//Carater azul
	img_blue.id = "blue1";
	img_blue.src = img_blue_source;
	//img_blue.crossOrigin = "anonymous"; // Should work fine

	//Carater vermelho
	img_red.id = "red1";
	img_red.src = img_red_source;
	//img_red.crossOrigin = "anonymous"; // Should work fine

    //Bola
    img_ball.id = "ball";
    img_ball.src = img_ball_source;

	container = new createjs.Container();

	stageBack = new createjs.Stage("canvasBack");

	stage = new createjs.Stage("myCanvas");
	stage.canvas.width = 1200;
	stage.canvas.height = 600;

	stageBack.canvas.width = stage.canvas.width;
	stageBack.canvas.height = stage.canvas.height;

	boundaryLeft = -20;
	boundaryRight = stage.canvas.width - 280;

	var random = Math.round(Math.random() * (5 - 1)) + 1
	var background = new Image();

	updateXY(random); //Atualiza os valores x e y default de acordo com o fundo escolhido

	background.src = "../resources/images/backgrounds/bg"+random+"_f.png";

	background.onload = function(){
		backBit = new createjs.Bitmap(background);
		container.addChild(backBit);
		stageBack.addChild(container);
		container.scaleX = container.scaleY = stageBack.canvas.width / backBit.image.width;
		stageBack.update();
	}

	img_blue.onload = function(){
		blueBit = new createjs.Bitmap(img_blue);
		stage.addChild(blueBit);
		blueBit.x = xposBlue;
		blueBit.y = yposBlue;
		drawBlue();
		setInterval(drawBlue, frameRate);
	}
	img_red.onload = function(){
		redBit = new createjs.Bitmap(img_red);
		stage.addChild(redBit);
		redBit.x = xposRed;
		redBit.y = yposRed;
		drawRed();
		setInterval(drawRed, frameRate);
	}
    img_ball.onload = function(){
        ballBit = new createjs.Bitmap(img_ball);
        stage.addChild(ballBit);
        ballBit.x = xposBall;
        ballBit.y = yposBall;
        stage.update();
        setInterval(stage.update(), frameRate);
    }

	document.addEventListener("keydown", keyDownEvent);
	document.addEventListener("keyup", keyUpEvent);

	//Começa a encher a barra do poder
	updateProgressBarFillBlue(widthProgressBarBlue);
	updateProgressBarFillRed(widthProgressBarRed);
}

function drawBlue(){
	//salto, colocar o intervalo disponivel assim que acabar o salto
	if(arguments.length != 0){ //yGround, current y
		if(arguments[0] == arguments[1]){
			//console.log("intervalUpArrowBlue set to -1!");
			intervalUpArrowBlue = -1;
			intervalMoveDownBlue = -1;
		}
	}
	stage.update();
}

function drawRed(){
	if(arguments.length != 0){
		if(arguments[0] == arguments[1]){
			//console.log("intervalUpArrowRed set to -1!");
			intervalUpArrowRed = -1;
			intervalMoveDownRed = -1;
		}
	}
	stage.update();
}

function moveLeftBlue(){
	//console.log("MOVE LEFT BLUE");
	//Se não houver colisao
	if(blueBit.x > boundaryLeft && checkCollision(redBit, blueBit.x- (powerBlue==1?speedBlue/2:speedBlue), blueBit.y) == false){
		//console.log("MOVE LEFT BLUE NO COLL");
		blueBit.x -= speedBlue;
	}

	//Se houver colisao
	else if(blueBit.x > boundaryLeft && checkCollision(redBit, blueBit.x-(powerBlue==1?speedBlue/2:speedBlue), blueBit.y) == true){
		//Se estiver a um certo y do chao, passa por cima
		if(blueBit.y < yGround - 20){
			blueBit.x -= speedBlue;
		}

		//Não esta a saltar, verifica se o vermelho pode andar para tras e o azul para a frente
		else if(redBit.x > boundaryLeft){
			//console.log("MOVE LEFT BLUE COL");
			blueBit.x -= speedBlueCollision;
			redBit.x -= speedRedCollision;

			//Som contacto
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);
			var queries = queryString.split("&");
			if(queries[0] == 1){
				audio2.play();
			}
		}
	}
	drawBlue();
	drawRed();
}

function moveLeftRed(){
	//console.log("MOVE LEFT RED", checkCollision(blueBit, redBit.x-5, redBit.y));
	if(redBit.x > boundaryLeft && checkCollision(blueBit, redBit.x-speedRed, redBit.y) == false){
		//console.log("MOVE LEFT RED NO COLL");
		redBit.x -= speedRed;
	}
	else if(redBit.x > boundaryLeft && checkCollision(blueBit, redBit.x-speedRed, redBit.y) == true){
		//Se estiver a um certo y do chao, passa por cima
		if(redBit.y < yGround - 20){
			redBit.x -= speedRed;
		}

		//Não esta a saltar, Verifica se o azul pode andar para a frente e o vermelho para tras
		else if(blueBit.x > boundaryLeft){
			//console.log("MOVE LEFT RED COL");
			redBit.x -= speedRedCollision;
			blueBit.x -= speedBlueCollision;

			//Som contacto
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);
			var queries = queryString.split("&");
			if(queries[0] == 1){
				audio2.play();
			}
		}
	}
	drawBlue();
	drawRed();
}

function moveRightRed(){
	//console.log("MOVE RIGHT RED");
	if(redBit.x < boundaryRight && checkCollision(blueBit, redBit.x+speedRed, redBit.y)==false){
		//console.log("MOVE RIGHT RED NO COL");
		redBit.x += speedRed;
	}
	else if(redBit.x < boundaryRight && checkCollision(blueBit, redBit.x+speedRed, redBit.y)==true){
		//Se estiver a um certo y do chao, passa por cima
		if(redBit.y < yGround - 20){
			redBit.x += speedRed;
		}

		//Não esta a saltar, verifica se o azul pode andar para tras
		else if(blueBit.x < boundaryRight){
			//console.log("MOVE RIGHT RED COL");
			redBit.x += speedRedCollision;
			blueBit.x += speedBlueCollision;

			//Som contacto
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);
			var queries = queryString.split("&");
			if(queries[0] == 1){
				audio2.play();
			}
		}
	}
	drawBlue();
	drawRed();
}

function moveRightBlue(){
	//console.log("MOVE RIGHT BLUE");
	if(blueBit.x < boundaryRight && checkCollision(redBit, blueBit.x+(powerBlue==1&&currentPower==1?speedBlue/2:speedBlue), blueBit.y)==false){
		//console.log("MOVE RIGHT BLUE NO COL");
		blueBit.x += speedBlue;
	}
	else if(blueBit.x < boundaryRight && checkCollision(redBit, blueBit.x+(powerBlue==1&&currentPower==1?speedBlue/2:speedBlue), blueBit.y)==true){
		//Se estiver a um certo y do chao, passa por cima
		if(blueBit.y < yGround - 20){
			blueBit.x += speedBlue;
		}

		//Não esta a saltar, Verifica se o vermelho pode andar para a frente
		else if(redBit.x < boundaryRight){
			//console.log("MOVE RIGHT BLUE COL");
			blueBit.x += speedBlueCollision;
			redBit.x += speedRedCollision;

			//Som contacto
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);
			var queries = queryString.split("&");
			if(queries[0] == 1){
				audio2.play();
			}
		}
	}
	drawBlue();
	drawRed();
}

function moveUpBlue(){ //Jump
	if(jumpSizeBlue > jumpMaxBlue){
		intervalMoveDownBlue = setInterval(moveDownBlue, frameRate);
		clearInterval(intervalUpArrowBlue);
		return;
	}
	else if(blueBit.y > 0){
		blueBit.y -= (15 + (0-jumpSizeBlue));
	}
	else if(blueBit.y < 0){
		intervalMoveDownBlue = setInterval(moveDownBlue, frameRate);
		clearInterval(intervalUpArrowBlue);
		return;
	}
	jumpSizeBlue += 1;
	drawBlue();
	drawRed();
}

function moveUpRed(){ //Jump
	if(jumpSizeRed > jumpMaxRed){
		intervalMoveDownRed = setInterval(moveDownRed, frameRate);
		clearInterval(intervalUpArrowRed);
		return;
	}
	else if(redBit.y > 0){
		redBit.y -= (15 + (0-jumpSizeRed));
	}
	else if(redBit.y < 0){
		intervalMoveDownRed = setInterval(moveDownRed, frameRate);
		clearInterval(intervalUpArrowRed);
		return;
	}

	jumpSizeRed += 1;
	drawBlue();
	drawRed();
}

function moveDownBlue(){
	console.log("moveDownBlue called!");
	if(blueBit.y != yGround){
		blueBit.y += (jumpMaxBlue - jumpSizeBlue);
	}
	if (blueBit.y == yGround){
		clearInterval(intervalMoveDownBlue);
	}
	jumpSizeBlue-=1;
	drawBlue(yGround, blueBit.y);
}

function moveDownRed(){
	console.log("moveDowRed called!");
	if(redBit.y != yGround){
		redBit.y += (jumpMaxRed - jumpSizeRed);
	}
	if (redBit.y == yGround){
		clearInterval(intervalMoveDownRed);
	}
	jumpSizeRed-=1;
	drawRed(yGround, redBit.y);
}

function keyDownEvent(evt){
	switch(evt.keyCode){
		//Azul (<, ^, >,spacebar)
		case 37:
			if(intervalmoveLeftBlue == -1){
				intervalmoveLeftBlue = setInterval(moveLeftBlue, 25);
			}
			break;
		case 38:
			if(intervalUpArrowBlue == -1){
				jumpSizeBlue = 0;
				intervalUpArrowBlue = setInterval(moveUpBlue, frameRate);
			}
			break;
		case 39:
			if(intervalRightArrowBlue == -1){
				intervalRightArrowBlue = setInterval(moveRightBlue, 25);
			}
			break;
		case 80:
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);
			var queries = queryString.split("&");
			if(queries[3] == 1){
				if(powerBlue == 0 && progressBarFillBlue == -1){
					powerBlue = 1;
					poderSelect(1, "blue", "enable");
					updateProgressBarEmptyBlue(widthProgressBarBlue);
					console.log("Poder ativado");
				}
			}
			break;
		//vermelho (A, W, D)
		case 65:
			if(intervalmoveLeftRed == -1){
				intervalmoveLeftRed = setInterval(moveLeftRed, 25);
			}
			break;
		case 87:
			if(intervalUpArrowRed == -1){
				jumpSizeRed = 0;
				intervalUpArrowRed = setInterval(moveUpRed, frameRate);
			}
			break;
		case 68:
			if(intervalRightArrowRed == -1){
				intervalRightArrowRed = setInterval(moveRightRed, 25);
			}
			break;
		case 32:
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);
			var queries = queryString.split("&");
			if(queries[3] == 1){
				if(powerRed == 0 && progressBarFillRed == -1){
					powerRed = 1;
					poderSelect(1, "red", "enable");
					updateProgressBarEmptyRed(widthProgressBarRed);
					console.log("Poder ativado");
				}
			}
	}
}

function keyUpEvent(evt){
	switch(evt.keyCode){
		case 37:
			clearInterval(intervalmoveLeftBlue);
			intervalmoveLeftBlue = -1;
			break;
		case 39:
			clearInterval(intervalRightArrowBlue);
			intervalRightArrowBlue = -1;
			break;
		case 65:
			clearInterval(intervalmoveLeftRed);
			intervalmoveLeftRed = -1;
			break;
		case 68:
		clearInterval(intervalRightArrowRed);
		intervalRightArrowRed = -1;
		break;
	}
}

function updateXY(random){
	switch(random){
		case 1:
		case 5:
			yposBlue = 360;
			yposRed = 360;
			yGround = 360;
      yposBall = 360;
			drawRed();
			drawBlue();
			break;
		case 2:
			yposBlue = 358;
			yposRed = 358;
			yGround = 358;
            yposBall = 358;
			drawRed();
			drawBlue();
			break;
		case 3:
			yposBlue = 365;
			yposRed = 365;
			yGround = 365;
            yposBall = 365;
			drawRed();
			drawBlue();
			break;
		case 4:
			yposBlue = 332;
			yposRed = 332;
			yGround = 332;
            yposBall = 332;
			drawRed();
			drawBlue();
			break;
	}
}

function checkCollision(otherBit, newPosX, newPosY){
	if(otherBit.x == newPosX) return true;
	else return false;
}

function updateProgressBarEmptyBlue(startFrom){
	//console.log("updateProgressBar called !");
	var bar = document.getElementById("progressoBarraAzul");

	if(progressBarEmptyBlue == -1 && progressBarFillBlue == -1){
		widthProgressBarBlue = startFrom;
		progressBarEmptyBlue = setInterval(updateProgressBarEmptyBlue, 50);
	}
	else{
		if(widthProgressBarBlue <= 0){
			clearInterval(progressBarEmptyBlue);
			progressBarEmptyBlue = -1;

			progressBarFillBlue = setInterval(updateProgressBarFillBlue, 150);

			powerBlue = 0;
			poderSelect(1, "blue", "clear");
		}
		else{
			widthProgressBarBlue--;
			//console.log("Bar width", widthProgressBar);
			bar.style.width = widthProgressBarBlue + "%";
			bar.innerHTML = widthProgressBarBlue * 1 + "%";
		}
	}
}

function updateProgressBarEmptyRed(startFrom){
	//console.log("updateProgressBar called !");
	var bar = document.getElementById("progressoBarraVerm");

	if(progressBarEmptyRed == -1 && progressBarFillRed == -1){
		widthProgressBarRed = startFrom;
		progressBarEmptyRed = setInterval(updateProgressBarEmptyRed, 50);
	}
	else{
		if(widthProgressBarRed <= 0){
			clearInterval(progressBarEmptyRed);
			progressBarEmptyRed = -1;

			progressBarFillRed = setInterval(updateProgressBarFillRed, 150);

			powerRed = 0;
			poderSelect(1, "red", "clear");
		}
		else{
			widthProgressBarRed--;
			//console.log("Bar width", widthProgressBar);
			bar.style.width = widthProgressBarRed + "%";
			bar.innerHTML = widthProgressBarRed * 1 + "%";
		}
	}
}

function updateProgressBarFillBlue(jogador){
	var bar = document.getElementById("progressoBarraAzul");

	if(progressBarFillBlue == -1){
		progressBarFillBlue = setInterval(updateProgressBarFillBlue, 150);
	}
	else{
		if(widthProgressBarBlue >= 100){
			clearInterval(progressBarFillBlue);
			progressBarFillBlue = -1;
		}
		else{
			widthProgressBarBlue++;
			//console.log("Bar width", widthProgressBar);
			bar.style.width = widthProgressBarBlue + "%";
			bar.innerHTML = widthProgressBarBlue * 1 + "%";
		}
	}
}

function updateProgressBarFillRed(jogador){
	var bar = document.getElementById("progressoBarraVerm");

	if(progressBarFillRed == -1){
		progressBarFillRed = setInterval(updateProgressBarFillRed, 150);
	}
	else{
		if(widthProgressBarRed >= 100){
			clearInterval(progressBarFillRed);
			progressBarFillRed = -1;
		}
		else{
			widthProgressBarRed++;
			//console.log("Bar width", widthProgressBar);
			bar.style.width = widthProgressBarRed + "%";
			bar.innerHTML = widthProgressBarRed * 1 + "%";
		}
	}
}

function poderSelect(num, jogador, estado){
	console.log("ESTADO", estado);
	switch(num){
		case 1:
			if(jogador === "blue"){
				if(estado === "enable") speedBlue = 10;
				else speedBlue = 5;
			}
			else{
				if(estado === "enable") speedRed = 10;
				else speedRed = 5;
			}
	}
}
