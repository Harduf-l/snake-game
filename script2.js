
window.scrollTo(0, 100);

var startTime;
var elapsedTime; 

document.getElementById("gameBody").onload= startCounter;


function startCounter() {
    startTime = Date.now();
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      document.getElementById("timer").innerHTML = timeToString(elapsedTime);
    }, 10);

}


function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let diffInMsSS = ms.toString().padStart(2, "0");
  
    return formattedMM + ":" + formattedSS + ":" + diffInMsSS ; 
  }
  

  //// game ////

  var scoreCounter = -3; 
  var score = document.getElementById("score"); 
  var speedTime = 150; 
  rewind_btn = document.getElementById("rewind_btn"); 
  score.innerHTML = scoreCounter; 
  var modalGameOver = document.getElementById("totalmodal"); 
  var game = true; 

  rewind_btn.onclick = startover; 

  var scoresObject = {

  }


  document.getElementById("home_btn").addEventListener("click", function(e) {
   
   location.href='/index.html'
   
   })
   
   

  var canvas=document.getElementById("canvas");
  var contex=canvas.getContext("2d");

  var blue="rgb(19,57,84)";
  var azure="rgb(28,78,107)";
  var yellow="rgb(221,148,49)"; 
  var grey="rgb(254,76,76)";
  var color=blue;
  for(var j=0;j<=30;j++){
      for(var i=0;i<=40;i++){
          contex.fillStyle =color;
          contex.fillRect(i*20,j*20,20,20);
          if(color==blue){
              color=azure;
          }
          else{
              color=blue;
          }
      } 
  }
  contex.fillStyle =yellow;
  contex.fillRect(380,280,20,20);
  var snake={
      size:1,
     dir:"L",
     arr:[[380,280]],
  };
  function randEat() {
      var x=Math.floor(Math.random()*40)*20;
      var y=Math.floor(Math.random()*30)*20;
       if(arrEat.includes([x,y])){
          randEat();
      }
      else{
          scoreCounter++
          score.innerHTML = scoreCounter; 
          speedCounter(scoreCounter);
        //   contex.fillStyle =grey;
        //   contex.fillRect(x,y,20,20);

            drawcircle(x,y)
            snakeSound(scoreCounter)
          return [x,y];
       }
  }

  function snakeSound(scoreCounter) {
      if (scoreCounter>0) {
        var audio = new Audio("eating.mp3");
         audio.play(); 
      }
  }

  function drawcircle(x,y) {

    contex.beginPath();
    contex.strokeStyle = "#cee974"; 
    contex.fillStyle = "#cee974"; 
    contex.arc(x+10, y+10, 9, 0, 2 * Math.PI);
    contex.lineWidth = 1; 
    contex.fill(); 
    contex.stroke();

    contex.beginPath();
    contex.strokeStyle = "green"; 
    contex.arc(x+1, y, 9, 0 * Math.PI, 0.3 * Math.PI);
    contex.lineWidth = 2; 
    contex.fill(); 
    contex.stroke();



  }



  var changeSpeedInterval = setInterval( move, speedTime);

  function speedCounter(scoreCounter) {
    
     if (scoreCounter >=3) {
        speedTime = 120
        clearInterval(changeSpeedInterval) 
        changeSpeedInterval = setInterval( move, speedTime)
      }

      if (scoreCounter >=6) {
        speedTime = 100;
        clearInterval(changeSpeedInterval) 
        changeSpeedInterval = setInterval( move, speedTime)
      }

      if (scoreCounter >=9) {
        speedTime = 80;
        clearInterval(changeSpeedInterval) 
        changeSpeedInterval = setInterval( move, speedTime)
      }
      if (scoreCounter >=12) {
        speedTime = 70;
        clearInterval(changeSpeedInterval) 
        changeSpeedInterval = setInterval( move, speedTime)
      }
      if (scoreCounter >=16) {
        speedTime = 60;
        clearInterval(changeSpeedInterval) 
        changeSpeedInterval = setInterval( move, speedTime)
      }
      if (scoreCounter >=20) {
        speedTime = 50;
        clearInterval(changeSpeedInterval) 
        changeSpeedInterval = setInterval( move, speedTime)
      }
    
  }



  var arrEat=[];
  arrEat.push(randEat());
  arrEat.push(randEat());
  arrEat.push(randEat());

  function move(){

     touchWall(snake.arr[0]);
      var prev=snake.arr[0]
      switch (snake.dir) {
          case "L":
              snake.arr[0]=[snake.arr[0][0]-20,snake.arr[0][1]];
              break;
          case "U":
              snake.arr[0]=[snake.arr[0][0],snake.arr[0][1]-20];
              break;
          case "R":
              snake.arr[0]=[snake.arr[0][0]+20,snake.arr[0][1]];
              break;
          case "D":
              snake.arr[0]=[snake.arr[0][0],snake.arr[0][1]+20];
              break;
      }
      for(var i=1;i<snake.arr.length;i++)
      {
        if(( JSON.stringify(snake.arr[0]))=== (JSON.stringify(snake.arr[i])))
        {
            gameover()
      }}

      eat( snake.arr[0]);



      for(var i=1;i<snake.arr.length;i++){

          var temp=snake.arr[i];
          snake.arr[i]=prev;
          prev=temp;

          contex.fillStyle ="#59311e";
          contex.fillRect(snake.arr[i][0],snake.arr[i][1],20,20);
      }

      contex.fillStyle =yellow;
      
      contex.fillRect(snake.arr[0][0],snake.arr[0][1],20,20);
      if(((prev[0]/20)%2==0 && (prev[1]/20)%2==0)||((prev[0]/20)%2!=0 && (prev[1]/20)%2!=0)){
          contex.fillStyle =blue;
          contex.fillRect(prev[0],prev[1],20,20);
      }
      else{
          contex.fillStyle =azure;
          contex.fillRect(prev[0],prev[1],20,20);
      }
  }

  function eat(eat) {
      for(var i=0;i<arrEat.length;i++)
      {
        if( JSON.stringify(eat)=== JSON.stringify(arrEat[i]))
        {
          snake.size++;
          snake.arr.push(eat);
          arrEat.splice(i,1);
          arrEat.push(randEat());
       } 
      }
          } 



  document.addEventListener('keydown', function(e) {

    e.preventDefault();

    if (game) {
        switch (e.key) {
            case "ArrowLeft":
                if (snake.dir == "R") {
                    break; 
                }
                snake.dir="L";
                break;
            case "ArrowUp":
                if (snake.dir == "D") {
                    break; 
                }
                snake.dir="U";
                break;
            case "ArrowRight":
                if (snake.dir == "L") {
                    break; 
                }
                snake.dir="R";
                break;
            case "ArrowDown":
                if (snake.dir == "U") {
                    break; 
                }
                snake.dir="D";
                break;
            default:
                break; 
        }
  
        move( );

    }
      
  });


  function clearsExistingnake() {

    for (var i=0; i<snake.arr.length; i++ ) {
    prev = snake.arr[i]

    if(((prev[0]/20)%2==0 && (prev[1]/20)%2==0)||((prev[0]/20)%2!=0 && (prev[1]/20)%2!=0)){
        contex.fillStyle =blue;
        contex.fillRect(prev[0],prev[1],20,20);
    }
    else{
        contex.fillStyle =azure;
        contex.fillRect(prev[0],prev[1],20,20);
    }

  }

}

function gameover(){
    game = false; 
    clearInterval(timerInterval) 
    clearInterval(changeSpeedInterval) 
    gameTable()

}

players = [{}, {}, {} ]


function gameTable() {
    
    var players;

    if ( localStorage.getItem("players") == null) {
        players = []; 
    } else {
        players = JSON.parse(localStorage.getItem("players")); 
    }


    var player = {
        "rank": "",
        "player": localStorage.getItem("player"),
        "scores":  scoreCounter,
        "time": timeToString(elapsedTime)
    }

    players.push(player)
    console.log(player)

    localStorage.setItem("players", JSON.stringify(players)); 

    var arrayPlayersBack =  JSON.parse(localStorage.getItem("players")) 

    console.log(arrayPlayersBack)

    buildTable(arrayPlayersBack)


    modalGameOver.style.visibility= "visible"; 
}



function buildTable(arrayPlayersBack) {

      
    arrayPlayersBack.sort(function (player1,player2) {
    return player2.scores - player1.scores; 
    } ); 



document.getElementById("table_div").innerHTML  = ""; 
var table = "";
var row = "";
var name = "";
var time = "";
var score = "";
var trEl = "";
var rank = ""; 

    var tableDivEl = document.getElementById("table_div");
    table = document.createElement("table");
    row = document.createElement("tr");

    table.className = "textGameOver"; 

    tableDivEl.appendChild(table);

    table.appendChild(row);

  
    var keysArr = Object.keys(arrayPlayersBack[0]);
    console.log(keysArr)


    for (var i=0; i < keysArr.length; i++) {
        var h = document.createElement("th")
        h.innerText = keysArr[i];
        row.appendChild(h);

    }

    var playersAmount;
    if (arrayPlayersBack.length > 8) {
        playersAmount = 8
    } else {
        playersAmount = arrayPlayersBack.length
    }


    for (var i =0; i < playersAmount ; i++) {
        rank = document.createElement("td");
         name = document.createElement("td");
         time = document.createElement("td");
         score = document.createElement("td");
        
        rank.innerText = i+1; 
        name.innerText = arrayPlayersBack[i].player;
        time.innerText = arrayPlayersBack[i].scores;
        score.innerText = arrayPlayersBack[i].time;

        
        trEl = document.createElement("tr");
        trEl.appendChild(rank);
        trEl.appendChild(name);
        trEl.appendChild(time);
        trEl.appendChild(score);

        table.appendChild(trEl);
    }

}



function pause() {
    clearInterval(timerInterval);
    document.getElementById("timer").innerHTML = "00:00:00"; 
    startCounter()
  }


  function startover(){
    modalGameOver.style.visibility= "hidden"; 
    game = true; 
    clearsExistingnake()
    clearInterval(changeSpeedInterval) 
    changeSpeedInterval = setInterval( move, 500)
    pause()
    speedTime = 150; 
    snake={size:1,dir:"L", arr:[[380,280]],};        
    scoreCounter = 0;
    score.innerHTML = scoreCounter; 

}


function touchWall(head)
   {
     
       switch(head[0])
       {
          case 800:
              {
                snake.arr[0]=[0,head[1]];
                  break;
              } 
          case -20:
              {
                  snake.arr[0]=[800,head[1]];
                    break;
              } 
            default: break;
       }
       switch(head[1])
       {
          case 600:
              {
                snake.arr[0]=[head[0],0];
                  break;
              } 
          case -20:
              {
                  snake.arr[0]=[head[0],600];
                    break;
              } 
            default: break;
       }
   }