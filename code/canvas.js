"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

var canvas;
var canvas2;
var currentWindow;
var spArray = new Array(1);
console.log(spArray);
var ctx;
var ctxBack;

var sprite;
var img_blue_source;
var img_red_source;

var img_blue;
var img_red;

var xposBlue;
var yposBlue;

var xposRed;
var yposRed;

var canvas_width;
var canvas_height;

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

var yGround = 300;

var frameRate = 1000/30;

function main(){
	xposBlue = 850;
	yposBlue = 300;
	xposRed = 50;
	yposRed = 300;

	i_width = 75;
	i_height = 75;

	currentWindow = document.defaultView;
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	var queries = queryString.split("&");

	img_blue_source = "../resources/images/blueTeam/char"+queries[1]+"_blue.png";
	img_red_source = "../resources/images/redTeam/char"+queries[0]+"_red.png";
	img_blue = new Image();
	img_red = new Image();
	//Carater azul
	//img_blue.addEventListener("load", imgLoadedHandler);
	img_blue.id = "blue1";
	img_blue.src = img_blue_source;  //dá ordem de carregamento da imagem

	//Carater vermelho
	img_red.id = "red1";
	img_red.src = img_red_source;

	canvas = document.getElementById("myCanvas");
	canvas2 = document.getElementById("canvasBack");
	ctx = canvas.getContext("2d");
	ctxBack = canvas2.getContext("2d");

	canvas.width = 1200;
	canvas.height = 600;
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;
	canvas_width = canvas.width;
	canvas_height = canvas.height;
	var random = Math.round(Math.random() * (5 - 1)) + 1
	var background = new Image();

	background.src = "../resources/images/backgrounds/bg"+random+"_f.png";

	background.onload = function(){
		ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, canvas2.width, canvas2.height);
	}

	img_blue.onload = function(){
		drawBlue();
		setInterval(drawBlue, frameRate);
	}
	img_red.onload = function(){
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
	ctx.clearRect(xposBlue, yposBlue, img_blue.width, img_blue.height);
	ctx.fillStyle = "#339933";
	ctx.drawImage(img_blue, xposBlue, yposBlue);
}

function drawRed(){
	if(arguments.length != 0){
		if(arguments[0] == arguments[1]){
			console.log("intervalUpArrowRed set to -1!");
			intervalUpArrowRed = -1;
			intervalMoveDownRed = -1;
		}
	}
	ctx.clearRect(xposRed, yposRed, img_red.width, img_red.height);
	ctx.fillStyle = "#339933";
	ctx.drawImage(img_red, xposRed, yposRed);
}

function moveLeftBlue(){
	if(xposBlue > 0){
		xposBlue -= 5;
	}
	drawBlue();
	drawRed();
}

function moveLeftRed(){
	if(xposRed > 0){
		xposRed -= 5;
	}
	drawBlue();
	drawRed();
}

function moveRightRed(){
	if(xposRed < canvas_width){
		xposRed += 5;
	}
	drawBlue();
	drawRed();
}

function moveRightBlue(){
	if(xposBlue < canvas_width){
		xposBlue += 5;
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
	else if(yposBlue > 0){
		yposBlue -= (15 + (0-jumpSizeBlue));
	}
	else if(yposBlue < 0){
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
	else if(yposRed > 0){
		yposRed -= (15 + (0-jumpSizeRed));
	}
	else if(yposRed < 0){
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
	if(yposBlue != yGround){
		yposBlue += (jumpMaxBlue - jumpSizeBlue);
	}
	if (yposBlue == yGround){
		clearInterval(intervalMoveDownBlue);
	}
	jumpSizeBlue-=1;
	drawBlue(yGround, yposBlue);
}

function moveDownRed(){
	console.log("moveDowRed called!");
	if(yposRed != yGround){
		yposRed += (jumpMaxRed - jumpSizeRed);
	}
	if (yposRed == yGround){
		clearInterval(intervalMoveDownRed);
	}
	jumpSizeRed-=1;
	drawRed(yGround, yposRed);
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
