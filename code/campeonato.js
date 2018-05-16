"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main()
{
	document.getElementById("menuBtn").onclick = function(){
  	     document.location.href = "menu.html";
  }

	var jogoBtn = document.getElementById("jogoBtn");
    var textBox = document.getElementById("numJogadores");
    
    textBox.addEventListener("click", function () {
        this.select();
    });

	jogoBtn.addEventListener("click", function(){
 
        var numJog = document.getElementById("numJogadores").value;
 
        if(isNaN(numJog)){
 
            document.getElementById("numJogadores").value = "Valor não aceite";
 
        }else{
 
            console.log(numJog);    
 
        }
 
        console.log(numJog);
 
  });
 
}