"use strict";

(function()
{
	window.addEventListener("load", main);
}());



function main(){
	var menuBtn = document.getElementById("menuBtn");

	menuBtn.addEventListener("click", function(){
		document.location.href = "opcoes.html";
	});
}
