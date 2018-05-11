"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

var canvas;
var currentWindow;
var spArray = new Array(1);
console.log(spArray);
var ctx;

var sprite;
var img_source;

var nLoad = 0;
	var totLoad = 1;
	var img;

var xpos;
var ypos;

var canvas_width;
var canvas_height;

var i_width;
var i_height;

var intervalLeftArrow = -1;
var intervalUpArrow = -1;
var intervalRightArrow = -1;
var intervalDownArrow = -1;

function main(){
	xpos = 1;
	ypos = 1;

	i_width = 75;
	i_height = 75;

	currentWindow = document.defaultView;
	/*currentWindow.addEventListener('resize', function(){
		canvas = document.getElementById("myCanvas");
		ctx = canvas.getContext("2d");
		canvas_width = window.innerWidth;
		canvas_height = window.innerHeight;

		draw();
	});*/

	img_source = "../resources/images/blueTeam/char1_blue.png";
	img = new Image();
	//img.addEventListener("load", imgLoadedHandler);
	img.id="blue1";
	img.src = img_source;  //dá ordem de carregamento da imagem

	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	/*canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas_width = canvas.width;
	canvas_height = canvas.height;*/
	canvas.width = 1200;
	canvas.height = 600;
	canvas_width = canvas.width;
	canvas_height = canvas.height;
	draw();

	document.addEventListener("keydown", keyDownEvent);
	document.addEventListener("keyup", keyUpEvent);

	setInterval(draw, 1000/30);
}

function draw()
{
	//console.log("Canvas width: " + canvas_width + ", canvas height: " + canvas_height);
	ctx.clearRect(xpos, ypos, img.width, img.height);
	ctx.fillStyle = "#339933";
	ctx.drawImage(img, xpos, ypos);
}

function moveLeft(){
	if(xpos > 0-(img.width/2)){
		xpos -= 5;
	}
	draw();
}

function moveRight(){
	if(xpos < canvas_width){
		xpos += 5;
	}
	draw();
}

function moveUp(){
	if(ypos > 0-(img.height/2)){
		ypos -= 5;
	}
	draw();
}

function moveDown(){
	if(ypos < canvas_height){
		ypos += 5;
	}
	draw();
}

function keyDownEvent(evt){
	switch(evt.keyCode){
		case 37:
			if(intervalLeftArrow == -1){
				intervalLeftArrow = setInterval(moveLeft, 25);
			}
			break;
		case 38:
			if(intervalUpArrow == -1){
				intervalUpArrow = setInterval(moveUp, 25);
			}
			break;
		case 39:
			if(intervalRightArrow == -1){
				intervalRightArrow = setInterval(moveRight, 25);
			}
			break;
		case 40:
			if(intervalDownArrow == -1){
				intervalDownArrow = setInterval(moveDown, 25);
			}
			break;
	}
}

function keyUpEvent(evt){
	switch(evt.keyCode){
		case 37:
			clearInterval(intervalLeftArrow);
			intervalLeftArrow = -1;
			break;
		case 38:
			clearInterval(intervalUpArrow);
			intervalUpArrow = -1;
			break;
		case 39:
			clearInterval(intervalRightArrow);
			intervalRightArrow = -1;
			break;
		case 40:
			clearInterval(intervalDownArrow);
			intervalDownArrow = -1;
			break;
	}
}
