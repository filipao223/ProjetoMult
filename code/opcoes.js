"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main(){
	var somBtn = document.getElementById("somBtn");
	var controlosBtn = document.getElementById("controlosBtn");
	var menuBtn = document.getElementById("menuBtn");

	somBtn.addEventListener("onclick", funtion(){
		document.location.href = "som.html";
	});

	controlosBtn.addEventListener("onclick", funtion(){
		document.location.href = "controlos.html";
	});

	menuBtn.addEventListener("onclick", function(){
		document.location.href = "menu.html";
	});
}
