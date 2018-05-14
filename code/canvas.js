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

var jmp_blue;
var jmp_red;

var xposBlue;
var yposBlue;

var xposRed;
var yposRed;

var canvas_width;
var canvas_height;

var i_width;
var i_height;

var intervalMoveLeftBlue = -1;
var intervalUpArrowBlue = -1;
var intervalRightArrowBlue = -1;
var intervalMoveDownBlue = -1;

var intervalMoveRightRed = -1;
var intervalMoveLeftRed = -1;
var intervalUpArrowRed = -1;
var intervalMoveDownRed = -1;

var previousyposBlueBeforeJump;
var previousyposRedBeforeJump
var jumpSizeBlue; //A altura do salto
var jumpMaxBlue = 15;

function main(){
	xposBlue = 850;
	yposBlue = 300;
	xposRed = 50;
	yposRed = 300;

	var player;

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

	drawBlue();
	drawRed();

	document.addEventListener("keydown", keyDownEvent);
	document.addEventListener("keyup", keyUpEvent);

	setInterval(drawBlue, 1000/30);
	setInterval(drawRed, 1000/30);
}

function drawBlue()
{
	//console.log("Canvas width: " + canvas_width + ", canvas height: " + canvas_height);
	ctx.clearRect(xposBlue, yposBlue, img_blue.width, img_blue.height);
	ctx.fillStyle = "#339933";
	//ctx.drawImage(img_blue, xposBlue, yposBlue);
	ctx.drawImage(img_blue, xposBlue, yposBlue, 10, 10, xposBlue,yposBlue,img_blue.width,img_blue.height);
}

function drawRed(){
	ctx.clearRect(xposRed, yposRed, img_red.width, img_red.height);
	ctx.fillStyle = "#339933";
	ctx.drawImage(img_red, xposRed, yposRed);
}

function moveLeft(player){
	if(player == 0){
		if(xposBlue > 0){
			xposBlue -= 5;
		}
		drawBlue();
		drawRed();
	}
	if(player == 1){
		if(xposRed > 0){
			xposRed -= 5;
		}
		drawBlue();
		drawRed();
	}
}

function moveRight(player){
	if(player == 0){
		if(xposBlue < canvas_width){
			xposBlue += 5;
		}
		drawBlue();
		drawRed();
	}
	if(player == 1){
			if(xposRed < canvas_width){
				xposRed += 5;
			}
			drawBlue();
			drawRed();
		}
	}
}

function moveUp(player){ //Jump
	if(yposBlue > 0){
		yposBlue -= 5;
	}
	if(yposBlue < 0){
		intervalMoveDownBlue = setInterval(moveDown);
		clearInterval(intervalUpArrowBlue);
		intervalUpArrowBlue = -1;
	}
	if(jumpSizeBlue > jumpMaxBlue){
		intervalMoveDownBlue = setInterval(moveDown);
		clearInterval(intervalUpArrowBlue);
		intervalUpArrowBlue = -1;
	}
	jumpSizeBlue += 1;
	drawBlue();
	drawRed();
}

function moveDown(player){
	if(yposBlue != previousyposBlueBeforeJump){
		yposBlue += 5;
		drawBlue();
		drawRed();
	}
	else{
		clearInterval(intervalMoveDownBlue);
		intervalMoveDownBlue = -1;
	}
}

function keyDownEvent(evt){
	switch(evt.keyCode){
		case 37:
			if(intervalMoveLeftBlue == -1){
				intervalMoveLeftBlue = setInterval(moveLeft(0), 25);
			}
			break;
		case 38:
			if(intervalUpArrowBlue == -1){
				jumpSizeBlue = 0;
				previousyposBlueBeforeJump = yposBlue;
				intervalUpArrowBlue = setInterval(moveUp, 25);
			}
			break;
		case 39:
			if(intervalRightArrowBlue == -1){
				intervalRightArrowBlue = setInterval(moveRight(0), 25);
			}
			break;

		case 87:
			if(intervalMoveRightRed == -1){
				intervalMoveRightRed == setInterval(moveRight,25);
			}
		break;

	case 65:
			if()
	}

}

function keyUpEvent(evt){
	switch(evt.keyCode){
		case 37:
			clearInterval(intervalMoveLeftBlue);
			intervalMoveLeftBlue = -1;
			break;
		case 38:
			clearInterval(intervalUpArrowBlue);
			intervalUpArrowBlue = -1;
			break;
		case 39:
			clearInterval(intervalRightArrowBlue);
			intervalRightArrowBlue = -1;
			break;
	}
}
