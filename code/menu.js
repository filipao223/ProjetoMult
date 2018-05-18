"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main()
{
	document.getElementById("sairBtn").onclick = function(){
  	window.close();
    }

		var queryString = decodeURIComponent(window.location.search);
		queryString = queryString.substring(1);
		var queries = queryString.split("&");

	var simplesBtn = document.getElementById("simplesBtn");
	var campeonatoBtn = document.getElementById("campeonatoBtn");
	var opcoesBtn = document.getElementById("opcoesBtn");
	var creditosBtn = document.getElementById("creditosBtn");

	simplesBtn.addEventListener("click", function(){
		document.location.href = "escolha.html" + "?" + queries[0] + "&" + queries[1];
	});

	campeonatoBtn.addEventListener("click", function(){
		document.location.href = "campeonato.html" + "?" + queries[0] + "&" + queries[1];
	});
	opcoesBtn.addEventListener("click", function(){
		document.location.href = "opcoes.html" + "?" + queries[0] + "&" + queries[1];
	});
	creditosBtn.addEventListener("click", function(){
		document.location.href = "creditos.html" + "?" + queries[0] + "&" + queries[1];
	});

	audio1.volume = 0.3;

	if(queries[1] == 0){
		audio1.volume = 0;
	}

}
