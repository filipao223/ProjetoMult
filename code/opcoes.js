"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main(){
	console.log("loaded")

	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	var queries = queryString.split("&");

	if(queries[1] == 0){
		audio1.volume = 0;
	}

	var somBtn = document.getElementById("somBtn");
	var controlosBtn = document.getElementById("controlosBtn");
	var menuBtn = document.getElementById("menuBtn");

	somBtn.addEventListener("click", function(){
		document.location.href = "som.html" + "?" + queries[0] + "&" + queries[1];
	});

	controlosBtn.addEventListener("click", function(){
		document.location.href = "controlos.html" + "?" + queries[0] + "&" + queries[1];
	});

	menuBtn.addEventListener("click", function(){
		document.location.href = "menu.html" + "?" + queries[0] + "&" + queries[1];
	});
}
