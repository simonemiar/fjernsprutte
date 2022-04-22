let points;
let liv;
let myRand;
let speed;
// Array med alle positioner
let posArray = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6"];
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

const liv1 = document.querySelector("#liv1");
const liv2 = document.querySelector("#liv2");
const liv3 = document.querySelector("#liv3");



window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("sidenVises");
    lvlComScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");

    startKnap.addEventListener("click", startGame);
}

function startGame() {
    console.log("startGame");
    startKnap.removeEventListener("click", startGame);
    gameOverKnap.removeEventListener("click", startGame);
    lvlComKnap.removeEventListener("click", startGame);


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

    //Blander posArray en funtion i bunden
    shuffle(posArray);

    //Giv en random position og random delay til container
    //sætter den første position fra det netop blandede posArray, shift() fjerner den indsatte position fra arrayet, efter den er brugt
    red1.classList.add(posArray.shift());
    myRand = Math.floor(Math.random() * 4) + 1;
    red1.classList.add("delay" + myRand);
    red1.classList.add("speed" + speed);

    red2.classList.add(posArray.shift());
    myRand = Math.floor(Math.random() * 4) + 1;
    red2.classList.add("delay" + myRand);
    red2.classList.add("speed" + speed);


    blue1.classList.add(posArray.shift());
    myRand = Math.floor(Math.random() * 4) + 1;
    blue1.classList.add("delay" + myRand);
    blue1.classList.add("speed" + speed);

    //Start op_ned-animationer på alle elementer
    red1.classList.add("op_ned");
    red2.classList.add("op_ned");
    blue1.classList.add("op_ned");

    //Lyt efter op_ned-animationer er færdig
    red1.addEventListener("animationiteration", genstartRed);
    red2.addEventListener("animationiteration", genstartRed);
    blue1.addEventListener("animationiteration", genstartBlue);

    //Lyt efter klik på alle elementer
    red1.addEventListener("mousedown", clickRed);
    red2.addEventListener("mousedown", clickRed);
    blue1.addEventListener("mousedown", clickBlue);
}

function clickRed() {
    console.log("clickRed");
    //ryd op, så man ikke kan kilkke på den samme flere gange
    this.removeEventListener("mousedown", clickRed);

    //frys (pause), op_ned-animationen 
    this.classList.add("frys");

    //Tæl en op på points og udskriv
    points++;
    score.innerHTML = points;

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

    //Laver classList om til en string (bogstaver)
    let test = String(this.classList);

    //Gemmer den class der har pos og et tal efter f.eks. pos8 og laver det om til en string
    let matches = String(test.match(/pos\d+/));

    //Sætter den positioner der var på elemetet tilbage i arrayet
    posArray.push(matches);
    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
    this.offsetLeft;
    //Blander posArray en funtion i bunden igen
    shuffle(posArray);

    //Giv en random position til container

    this.classList.add(posArray.shift());

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
    //Laver classList om til en string (bogstaver)
    let test = String(this.classList);

    //Gemmer den class der har pos og et tal efter f.eks. pos8 og laver det om til en string
    let matches = String(test.match(/pos\d+/));

    //Sætter den positioner der var på elemetet tilbage i arrayet
    posArray.push(matches);
    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
    this.offsetLeft;
    //Blander posArray en funtion i bunden igen
    shuffle(posArray);
    //Giv en random position til container

    this.classList.add(posArray.shift());

    //sæt speed på
    this.classList.add("speed" + speed);

    //Start op_ned-animationer på element
    this.classList.add("op_ned");

    //Lyt efter klik på element
    this.addEventListener("mousedown", clickBlue);
}

function stopSpillet() {
    console.log("stopSpillet");

    //Stop timer
    timer.firstElementChild.classList.remove("time");
    timer.removeEventListener("animationend", stopSpillet);

    //fjern alt er på alle elementers container og sprite
    red1.classList = "";
    red1.firstElementChild.classList = "";
    red2.classList = "";
    red2.firstElementChild.classList = "";
    blue1.classList = "";
    blue1.firstElementChild.classList = "";

    //fjern alle event listener på alle containere
    red1.removeEventListener("animationiteration", genstartRed);
    red1.removeEventListener("animationend", genstartRed);
    red1.removeEventListener("mousedown", clickRed);

    red2.removeEventListener("animationiteration", genstartRed);
    red2.removeEventListener("animationend", genstartRed);
    red2.removeEventListener("mousedown", clickRed);

    blue1.removeEventListener("animationiteration", genstartBlue);
    blue1.removeEventListener("animationend", genstartBlue);
    blue1.removeEventListener("mousedown", clickBlue);

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
    gameOverPoints.textContent = "Du fik " + points + " Points";
    gameOverScreen.classList.remove("skjul");
    gameOverKnap.addEventListener("click", startGame);
}

function levelComplete() {
    console.log("levelComplete");
    lvlComPoints.textContent = "Du fik " + points + " Points";
    lvlComScreen.classList.remove("skjul");
    lvlComKnap.addEventListener("click", startGame);

}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
