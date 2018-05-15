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

var img_blue;
var img_red;
var backBit; //Bitmaps
var blueBit;
var redBit;

var xposBlue;
var yposBlue;

var xposRed;
var yposRed;

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

function main(){
	xposBlue = 850;
	yposBlue = 360;
	xposRed = 50;
	yposRed = 360;

	yGround = yposBlue;

	i_width = 75;
	i_height = 75;

	currentWindow = document.defaultView;
	//Escolha dos carateres
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	var queries = queryString.split("&");

	img_blue_source = "../resources/images/blueTeam/char"+queries[1]+"_blue.png";
	img_red_source = "../resources/images/redTeam/char"+queries[0]+"_red.png";
	img_blue = new Image();
	img_red = new Image();
	//Carater azul
	img_blue.id = "blue1";
	img_blue.src = img_blue_source;
	//img_blue.crossOrigin = "anonymous"; // Should work fine

	//Carater vermelho
	img_red.id = "red1";
	img_red.src = img_red_source;
	//img_red.crossOrigin = "anonymous"; // Should work fine

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

	document.addEventListener("keydown", keyDownEvent);
	document.addEventListener("keyup", keyUpEvent);
}

function drawBlue(){
	//salto, colocar o intervalo disponivel assim que acabar o salto
	if(arguments.length != 0){ //yGround, current y
		if(arguments[0] == arguments[1]){
			console.log("intervalUpArrowBlue set to -1!");
			intervalUpArrowBlue = -1;
			intervalMoveDownBlue = -1;
		}
	}
	stage.update();
}

function drawRed(){
	if(arguments.length != 0){
		if(arguments[0] == arguments[1]){
			console.log("intervalUpArrowRed set to -1!");
			intervalUpArrowRed = -1;
			intervalMoveDownRed = -1;
		}
	}
	stage.update();
}

function moveLeftBlue(){

	var mvmt = 5;

	if(blueBit.x > boundaryLeft && checkCollision(redBit, blueBit.x-mvmt, blueBit.y) == false){
		console.log("no collision");
		blueBit.x -= 5;
	}
	else if(blueBit.x > boundaryLeft && checkCollision(redBit, blueBit.x-mvmt, blueBit.y) == true){
		console.log("collision");
		//Verifica se o vermelho pode andar para tras e o azul para a frente
		if(redBit.x > boundaryLeft){
			blueBit.x -= 2;
			redBit.x -= 2;
		}
	}
	drawBlue();
	drawRed();
}

function moveLeftRed(){
	if(redBit.x > boundaryLeft && checkCollision(blueBit, redBit.x-5, redBit.y-5) == false){
		redBit.x -= 5;
	}
	else if(redBit.x > boundaryLeft && checkCollision(blueBit, redBit.x-5, redBit.y-5) == true){
		//Verifica se o azul pode andar para a frente e o vermelho para tras
		if(blueBit.x > boundaryLeft){
			redBit.x += 2;
			blueBit.x -= 2;
		}
	}
	drawBlue();
	drawRed();
}

function moveRightRed(){
	if(redBit.x < boundaryRight && checkCollision(blueBit, redBit.x + 5, redBit.y)==false){
		redBit.x += 5;
	}
	else if(redBit.x < boundaryRight && checkCollision(blueBit, redBit.x + 5, redBit.y)==true){
		//Verifica se o azul pode andar para tras
		if(blueBit.x < boundaryRight){
			redBit.x += 2;
			blueBit.x += 2;
		}
	}
	drawBlue();
	drawRed();
}

function moveRightBlue(){
	if(blueBit.x < boundaryRight && checkCollision(redBit, blueBit.x + 5, blueBit.y)==false){
		blueBit.x += 5;
	}
	else if(blueBit.x < boundaryRight && checkCollision(redBit, blueBit.x + 5, blueBit.y)==true){
		//Verifica se o vermelho pode andar para a frente
		if(redBit.x < boundaryRight){
			blueBit.x += 2;
			redBit.x += 2;
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
		//Azul (<, ^, >)
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
			drawRed();
			drawBlue();
			break;
		case 2:
			yposBlue = 358;
			yposRed = 358;
			yGround = 358;
			drawRed();
			drawBlue();
			break;
		case 3:
			yposBlue = 365;
			yposRed = 365;
			yGround = 365;
			drawRed();
			drawBlue();
			break;
		case 4:
			yposBlue = 332;
			yposRed = 332;
			yGround = 332;
			drawRed();
			drawBlue();
			break;
	}
}

function checkCollision(otherBit, newPosX, newPosY){
	if(otherBit.x == newPosX) return true;
	else return false;
}
