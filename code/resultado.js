"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
		var queryString = decodeURIComponent(window.location.search);
		queryString = queryString.substring(1);
		var queries = queryString.split("&");

		audio1.volume = 0.3;

		if(queries[1] == 0){
			audio1.volume =0;
		}

		if(queries[2] && queries[3] != "undefined"){
    	texto.textContent=(queries[2] + "-" + queries[3]);
		}
		else{
			texto.textContent=(0 + "-" + 0);
		}

		var menuBtn = document.getElementById("menuBtn");


		menuBtn.addEventListener("click", function(){
			document.location.href = "menu.html" + "?" + queries[0] + "&" + queries[1];
		});

}
