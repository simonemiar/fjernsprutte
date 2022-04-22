let points;
let liv;
let myRand;
let speed;
const timer = document.querySelector("#time_container");
const score = document.querySelector("#score_board");
const red1 = document.querySelector("#red_container1");
const red2 = document.querySelector("#red_container2");
const blue1 = document.querySelector("#blue_container1");
const lvlComScreen = document.querySelector("#level_complete");
const lvlComKnap = document.querySelector("#genstart2");
const lvlComPoints = document.querySelector("#level_complete_points");
const gameOverScreen = document.querySelector("#game_over");
const gameOverKnap = document.querySelector("#genstart1");
const gameOverPoints = document.querySelector("#game_over_points");
const startScreen = document.querySelector("#start");
const startKnap = document.querySelector("#start_knap");


const liv1 = document.querySelector("#liv1")
const liv2 = document.querySelector("#liv2")
const liv3 = document.querySelector("#liv3")

window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("sidenVises");
    startKnap.addEventListener("click", startGame);
}

function startGame() {
    console.log("startGame");
    startKnap.removeEventListener("click", startGame);

    lvlComScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    startScreen.classList.add("skjul");



    //Nulstil point og udskriv
    points = 0;
    score.innerHTML = points;

    //reset liv til 3
    liv = 3;
    liv1.classList.remove("gray");
    liv2.classList.remove("gray");
    liv3.classList.remove("gray");

    //reset speed
    speed = 1;

    //Start timer
    timer.firstElementChild.classList.add("time");
    timer.addEventListener("animationend", stopSpillet);

    //Giv en random position og random delay til container
    myRand = Math.floor(Math.random() * 6) + 1;
    red1.classList.add("pos" + myRand);
    myRand = Math.floor(Math.random() * 4) + 1;
    red1.classList.add("delay" + myRand);
    red1.classList.add("speed" + speed);

    //Giv en random position og random delay til container
    myRand = Math.floor(Math.random() * 6) + 1;
    red2container.classList.add("pos" + myRand);
    myRand = Math.floor(Math.random() * 4) + 1;
    red2container.classList.add("delay" + myRand);
    red2container.classList.add("speed" + speed);

    myRand = Math.floor(Math.random() * 6) + 1;
    blue1container.classList.add("pos" + myRand);
    myRand = Math.floor(Math.random() * 4) + 1;
    blue1container.classList.add("delay" + myRand);
    blue1container.classList.add("speed" + speed);

    //Start op_ned-animationer på alle elementer
    red1.classList.add("op_ned");
    red2container.classList.add("op_ned");
    blue1container.classList.add("op_ned");

    //Lyt efter op_ned-animationer er færdig
    red1.addEventListener("animationiteration", genstartRed);
    red2container.addEventListener("animationiteration", genstartRed);
    blue1container.addEventListener("animationiteration", genstartBlue);

    //Lyt efter klik på alle elementer
    red1.addEventListener("mousedown", clickRed);
    red2container.addEventListener("mousedown", clickRed);
    blue1container.addEventListener("mousedown", clickBlue);
}

function clickRed() {
    console.log("clickRed");
    //ryd op, så man ikke kan kilkke på den samme flere gange
    this.removeEventListener("mousedown", clickRed);

    //frys (pause), op_ned-animationen 
    this.classList.add("frys");

    //Tæl en op på points og udskriv
    points++;
    document.querySelector("#score_board").innerHTML = points;

    //Når man har fået 3 points og ved 6 points skru op for speed
    if (points >= 6) {
        console.log("points >= 6");
        speed = 3;
    } else if (points >= 3) {
        console.log("points >= 6");
        speed = 2;
    }

    //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
    this.firstElementChild.classList.add("forsvind");

    //Lyt efter op_ned-animationer er færdig
    this.addEventListener("animationend", genstartRed);
}

function genstartRed() {
    console.log("genstartRed");
    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
    this.offsetLeft;


    //Giv en random position til container
    myRand = Math.floor(Math.random() * 6) + 1;
    this.classList.add("pos" + myRand);

    //sæt speed på
    this.classList.add("speed" + speed);

    //Start forsvind-animationer på element
    this.classList.add("op_ned");

    //Lyt efter klik på element
    this.addEventListener("mousedown", clickRed);
}

function clickBlue() {
    console.log("clickBlue");
    //ryd op, så man ikke kan kilkke på den samme flere gange
    this.removeEventListener("mousedown", clickBlue);

    //frys (pause), op_ned-animationen 
    this.classList.add("frys");

    //Tilføj grå til det liv man er nået til, der efter tæl en ned på liv
    document.querySelector("#liv" + liv).classList.add("gray");
    liv--;


    //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
    this.firstElementChild.classList.add("forsvind");

    //Lyt efter forsvind-animationer er færdig
    this.addEventListener("animationend", genstartBlue);

    //hvis der ikke er flere liv stop spillet
    if (liv <= 0) {
        stopSpillet();
    }
}

function genstartBlue() {
    console.log("genstartBlue");
    //ryd op, fjern alt er på container og sprite
    document.querySelector("#blue_container1").classList = "";
    document.querySelector("#blue_sprite1").classList = "";

    //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
    document.querySelector("#blue_container1").offsetLeft;

    //Giv en random position til container
    myRand = Math.floor(Math.random() * 6) + 1;
    document.querySelector("#blue_container1").classList.add("pos" + myRand);

    //sæt speed på
    document.querySelector("#blue_container1").classList.add("speed" + speed);

    //Start op_ned-animationer på element
    document.querySelector("#blue_container1").classList.add("op_ned");

    //Lyt efter klik på element
    document.querySelector("#blue_container1").addEventListener("mousedown", clickBlue);
}

function stopSpillet() {
    console.log("stopSpillet");

    //Stop timer
    document.querySelector("#time_sprite").classList.remove("time");
    document.querySelector("#time_container").removeEventListener("animationend", stopSpillet);

    //fjern alt er på alle elementers container og sprite
    document.querySelector("#red_container1").classList = "";
    document.querySelector("#red_sprite1").classList = "";
    document.querySelector("#blue_container1").classList = "";
    document.querySelector("#blue_sprite1").classList = "";

    //fjern alle event listener på alle containere
    document.querySelector("#red_container1").removeEventListener("animationiteration", genstartRed);
    document.querySelector("#red_container1").removeEventListener("animationend", genstartRed);
    document.querySelector("#red_container1").removeEventListener("mousedown", clickRed);

    document.querySelector("#blue_container1").removeEventListener("animationiteration", genstartBlue);
    document.querySelector("#blue_container1").removeEventListener("animationend", genstartBlue);
    document.querySelector("#blue_container1").removeEventListener("mousedown", clickBlue);

    if (liv <= 0) {
        gameover();
    } else if (points >= 5) {
        levelComplete();
    } else {
        gameover();
    }
}

function gameover() {
    console.log("gameover");
    gameOverPoints.textContent = "Du fik " + points + "Points";
    gameOverScreen.classList.remove("skjul");
    gameOverKnap.classList.addEventListener("click", startgame);

}

function levelComplete() {
    console.log("levelComplete");
    lvlComPoints.textContent = "Du fik " + points + "Points";
    lvlComScreen.classList.remove("skjul");
    lvlComKnap.classList.addEventListener("click", startgame);


}
