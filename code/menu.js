"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main()
{
	document.getElementById("sairBtn").onclick = function(){
  	self.close();
  }

	var simplesBtn = document.getElementById("simplesBtn");
	var campeonatoBtn = document.getElementById("campeonatoBtn");
	var opcoesBtn = document.getElementById("opcoesBtn");
	var creditosBtn = document.getElementById("creditosBtn");

	simplesBtn.addEventListener("click", function(){
		document.location.href = "escolha.html";
	});

	campeonatoBtn.addEventListener("click", function(){
		/*Qualquer coisa*/
	});
	opcoesBtn.addEventListener("click", function(){
		document.location.href = "opcoes.html";
	});
	creditosBtn.addEventListener("click", function(){
		document.location.href = "creditos.html";
	});
}
