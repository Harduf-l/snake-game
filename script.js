
document.getElementById("gameStartedButton").addEventListener("click", function(e) {
 e.preventDefault();
console.log("hello"); 
console.log(nameEntered.value); 

localStorage.setItem("player", nameEntered.value)

location.href='/game.html'

})


