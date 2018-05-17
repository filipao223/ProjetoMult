"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{

  var musicOn = 1;
  var effectsOn = 1;

  var musicBtn = document.getElementById("musica");
  var effectsBtn = document.getElementById("efeitos");
  var sairBtn = document.getElementById("sairBtn");

	audio1.volume = 0.3;
	
  musicBtn.addEventListener("click", function(){
    musicOn = updateMusica(musicOn);
		audio1.volume = 0;
  });

  effectsBtn.addEventListener("click", function(){
    effectsOn = updateEfeitos(effectsOn);
  })

  sairBtn.addEventListener("click", function(){
    document.location.href = "opcoes.html" + "?" + effectsOn + "&" + musicOn;
  })
}

function backToOptions()
{
  document.location.href = "opcoes.html";
}

function updateMusica(musicOn)
{
  if(musicOn){
    document.getElementById("musica").childNodes[0].data = "MUSICA OFF";
    return 0;
  }
  else{
    document.getElementById("musica").childNodes[0].data = "MUSICA ON";
    return 1;
  }
}

function updateEfeitos(effectsOn)
{
  if(effectsOn){
    document.getElementById("efeitos").childNodes[0].data = "EFEITOS OFF";
    return 0;
  }
  else{
    document.getElementById("efeitos").childNodes[0].data = "EFEITOS ON";
    return 1;
  }
}
