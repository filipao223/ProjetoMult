"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{

    var numImgBlue = 1;
    var photoBlue = document.getElementById("photoBlue");
    var numImgRed = 1;
    var photoRed = document.getElementById("photoRed");

		var jogarBtn = document.getElementById("jogarBtn");
		var menuBtn = document.getElementById("menuBtn");

    var blueTeamNext = document.getElementById("blueTeamNextBtn");
        blueTeamNext.addEventListener("click", function(){
        numImgBlue = onClickButtons(blueTeamNext, photoBlue, numImgBlue);
        }, true);

    var blueTeamBack = document.getElementById("blueTeamBackBtn");
        blueTeamBack.addEventListener("click", function(){
        numImgBlue = onClickButtons(blueTeamBack, photoBlue, numImgBlue);
        }, true);

    var redTeamNext = document.getElementById("redTeamNextBtn");
        redTeamNext.addEventListener("click", function(){
        numImgRed = onClickButtons(redTeamNext, photoRed, numImgRed);
        }, true);

    var redTeamBack = document.getElementById("redTeamBackBtn");
        redTeamBack.addEventListener("click", function(){
        numImgRed = onClickButtons(redTeamBack, photoRed, numImgRed);
        }, true);

		menuBtn.addEventListener("click", function(){
			document.location.href = "menu.html";
		});

		jogarBtn.addEventListener("click", function(){
			document.location.href = "canvas.html" + "?" +numImgRed + "&" + numImgBlue;
		});
}

function onClickButtons(button, photo, numImg)
{
    if(button == document.getElementById("blueTeamNextBtn")){
        if(numImg==8){
            numImg = 1;
        }else{
            numImg++;
        }
        var source = "../resources/images/blueTeam/char" + numImg.toString()+"_blue.png";
        console.log(numImg);
        photo.src = source;
    }

    else if(button == document.getElementById("blueTeamBackBtn")){
        if(numImg == 1){
            numImg = 8;
        }else{
            numImg--;
        }
        var source = "../resources/images/blueTeam/char" + numImg.toString()+"_blue.png";
        photo.src = source;
    }

    else if(button == document.getElementById("redTeamNextBtn")){
        if(numImg==8){
            numImg = 1;
        }else{
            numImg++;
        }
        var source = "../resources/images/redTeam/char" + numImg.toString()+"_red.png";
        photo.src = source;
    }

    else if(button == document.getElementById("redTeamBackBtn")){
        if(numImg == 1){
            numImg = 8;
        }else{
            numImg--;
        }
        var source = "../resources/images/redTeam/char" + numImg.toString()+"_red.png";
        photo.src = source;
    }


    return numImg;
}
