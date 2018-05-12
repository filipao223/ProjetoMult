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

	var jogoBtn = document.getElementById("jogoBtn");

	jogoBtn.addEventListener("click", function(){
        var numJog = document.getElementById("numJogadores").value;
        console.log(numJog);
	});
}