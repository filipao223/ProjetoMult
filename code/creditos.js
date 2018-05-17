"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main(){
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	var queries = queryString.split("&");

	if(queries[1] == 0){
		audio1.volume =0;
	}

	menuBtn.addEventListener("click", function(){
		document.location.href = "menu.html" + "?" + queries[0] + "&" + queries[1];
	});

}
