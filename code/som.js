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

  var musicOn = 1;
  var effectsOn = 1;

  var musicBtn = document.getElementById("musica");
  var effectsBtn = document.getElementById("efeitos");
  var sairBtn = document.getElementById("sairBtn");

  musicBtn.addEventListener("click", function(){
    musicOn = updateMusica(musicOn);
    if(musicOn){
      /*Ligar musica*/
    }
    else{
      /*Desligar musica*/
    }
  });

  effectsBtn.addEventListener("click", function(){
    effectsOn = updateEfeitos(effectsOn);
    if(effectsOn){
      /*Desligar efeitos*/
    }
    else{
      /*Desligar efeitos*/
    }
  })

  sairBtn.addEventListener("click", function(){
    document.location.href = "opcoes.html"
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
