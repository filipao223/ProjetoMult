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

	document.getElementById("menuBtn").onclick = function(){
  	     document.location.href = "menu.html" + "?" + queries[0] + "&" + queries[1];
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
