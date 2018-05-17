"use strict";

(function()
{
	window.addEventListener("load", main);
}());



function main(){
	var menuBtn = document.getElementById("menuBtn");

	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	var queries = queryString.split("&");

	menuBtn.addEventListener("click", function(){
		document.location.href = "opcoes.html" + "?" + queries[0] + "&" + queries[1];
	});
}
