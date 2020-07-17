/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores,roundScore,activePlayer,gamePlaying;
var audio=new Audio('assets/dice.mp3');

 
init(); //start func.




//document.querySelector("#current-" +activePlayer).textContent=dice; //setter
//document.querySelector("#current-" +activePlayer).innerHTML= '<em>' + dice + '</em>';

//get value from DOM

//var x = document.querySelector('#score-0').textContent; //getter





//event listener

//eğer bir function btn yaratsaydik böyle kullanırdık 
//document.querySelector(".btn-roll").addEventListener("click",btn) //eventlistener call the func for us so we dont use btn() like that
//fakat btn fonksiyonu bir tek yer kullanılacğından anonim bir şekilde olurşturalım.

document.querySelector(".btn-roll").addEventListener("click",function(){


if(gamePlaying)
{
         //1.random number
   var dice = Math.floor(Math.random()*6)+1; //1-6

   //2-display the result
   audio.play();
   var diceDOM=document.querySelector('.dice');
   diceDOM.style.display="block";
   diceDOM.src='assets/dice-'+dice+'.png';


   //3.update the round score if the rolled number was NOT 1
   if(dice !== 1){
       //add score
       roundScore += dice;
       document.querySelector("#current-" +activePlayer).textContent =roundScore;
   }
   else
   {
      
       nextPlayer();
   }
}   

   

});

//hold btn eventlistener
document.querySelector(".btn-hold").addEventListener("click", function(){


    if (gamePlaying){
        var realP=activePlayer+1;
    //Add current score to global score
    scores[activePlayer] += roundScore;


    //update the UI
    document.querySelector("#score-" + activePlayer).textContent=scores[activePlayer];

    //check if player won the game
    if(scores[activePlayer]>=20)
    {
        document.querySelector("#name-"+activePlayer).textContent="Winner!";
        setTimeout(function(){document.querySelector(".dice").style.display="none";},1000);
        document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
        gamePlaying=false;
    }
    else{
        nextPlayer();
    }
    }



   
});

//new game button event listener
document.querySelector(".btn-new").addEventListener("click",init);



function init(){
    gamePlaying=true;
    scores =[0,0];
    roundScore =0;
    activePlayer=0; //0 -firstP  1-SecondP
    

    
//to change css
document.querySelector(".dice").style.display="none";

document.getElementById("score-0").textContent="0";
document.getElementById("score-1").textContent="0";
document.getElementById("current-0").textContent="0";
document.getElementById("current-1").textContent="0";
document.getElementById("name-0").textContent="Player 1";
document.getElementById("name-1").textContent="Player 2";
document.querySelector(".player-0-panel").classList.remove("winner");
document.querySelector(".player-1-panel").classList.remove("winner");
document.querySelector(".player-0-panel").classList.remove("active");
document.querySelector(".player-1-panel").classList.remove("active");

document.querySelector(".player-0-panel").classList.add("active");

}





function nextPlayer(){
    //Next Player
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    var player=activePlayer+1;
    roundScore = 0;
   
   
    setTimeout(function(){document.querySelector(".dice").style.display="none";},2500);
    //alert("PLAYER "+player+" WILL PLAY!");
    document.getElementById("current-0").textContent="0";
    document.getElementById("current-1").textContent="0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
 
}