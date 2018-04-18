"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main(){
	console.log("loaded")
	var somBtn = document.getElementById("somBtn");
	var controlosBtn = document.getElementById("controlosBtn");
	var menuBtn = document.getElementById("menuBtn");

	somBtn.addEventListener("click", function(){
		document.location.href = "som.html";
	});

	controlosBtn.addEventListener("click", function(){
		document.location.href = "controlos.html";
	});

	menuBtn.addEventListener("click", function(){
		document.location.href = "menu.html";
	});
}
