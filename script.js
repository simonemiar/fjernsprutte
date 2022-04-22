let points;
let myRand;
// Array med alle positioner
let posArray = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6", "pos7", "pos8", "pos9"];
const timer = document.querySelector("#tid_container");
const badContainer1 = document.querySelector("#bad_container1");
const badContainer2 = document.querySelector("#bad_container2");
const badContainer3 = document.querySelector("#bad_container3");
const goodContainer1 = document.querySelector("#good_container1");
const goodContainer2 = document.querySelector("#good_container2");
const goodContainer3 = document.querySelector("#good_container3");
const lvlComScreen = document.querySelector("#level_complete");
const lvlComPoints = document.querySelector("#level_complete_points");
const gameOverScreen = document.querySelector("#game_over");
const gameOverPoints = document.querySelector("#game_over_points");
const startScreen = document.querySelector("#start");
const startInfo = document.querySelector("#start_info");
const startKnap = document.querySelector("#start_knap");
const startKnap2 = document.querySelector("#start_knap2");
const genstart1Knap = document.querySelector("#genstart1");
const genstart2Knap = document.querySelector("#genstart2");


const liv1 = document.querySelector("#liv1");
const liv2 = document.querySelector("#liv2");
const liv3 = document.querySelector("#liv3");


window.addEventListener("load", sidenVises);

function sidenVises() {

    console.log("sidenVises");
    lvlComScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    startInfo.classList.add("skjul");

    startKnap.addEventListener("click", visInfo);

}

function visInfo() {
    console.log("visInfo");
    startKnap2.addEventListener("click", startGame);
    startInfo.classList.remove("skjul");
    startScreen.classList.add("skjul");


}

function startGame() {
    console.log("startGame");
    lvlComScreen.classList.add("skjul");
    startScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    startInfo.classList.add("skjul");


    points = 0;
    document.querySelector("#score_board").innerHTML = points



    //    reset liv til 3
    liv = 3;
    liv1.classList.remove("gray");
    liv2.classList.remove("gray");
    liv3.classList.remove("gray");



    //start timer
    timer.firstElementChild.classList.add("tid");
    timer.addEventListener("animationend", stopSpillet);


    myRand = Math.floor(Math.random() * 9) + 1;
    badContainer1.classList.add("pos" + myRand, "delay1", "speed1", "fade_in");

    myRand = Math.floor(Math.random() * 9) + 1;
    badContainer2.classList.add("pos" + myRand, "delay1", "speed1", "fade_in");

    myRand = Math.floor(Math.random() * 9) + 1;
    badContainer3.classList.add("pos" + myRand, "delay1", "speed1", "fade_in");


    myRand = Math.floor(Math.random() * 9) + 1;
    goodContainer1.classList.add("pos" + myRand, "delay2", "speed2", "fade_in");

    myRand = Math.floor(Math.random() * 9) + 1;
    goodContainer2.classList.add("pos" + myRand, "delay2", "speed2", "fade_in");

    myRand = Math.floor(Math.random() * 9) + 1;
    goodContainer3.classList.add("pos" + myRand, "delay2", "speed2", "fade_in");


    //Lyt efter fald-animationer er færdig
    badContainer1.addEventListener("animationiteration", genstartBad);
    badContainer2.addEventListener("animationiteration", genstartBad);
    badContainer3.addEventListener("animationiteration", genstartBad);

    goodContainer1.addEventListener("animationiteration", genstartGood);
    goodContainer2.addEventListener("animationiteration", genstartGood);
    goodContainer3.addEventListener("animationiteration", genstartGood);

    //Lyt efter klik på alle elementer
    badContainer1.addEventListener("mousedown", clickBad);
    badContainer2.addEventListener("mousedown", clickBad);
    badContainer3.addEventListener("mousedown", clickBad);


    goodContainer1.addEventListener("mousedown", clickGood);
    goodContainer2.addEventListener("mousedown", clickGood);
    goodContainer3.addEventListener("mousedown", clickGood);


    //Lytter efter om tiden er gået 
    document.querySelector("#tid_sprite").addEventListener("animationend", stopSpillet);
}

function clickBad() {
    console.log("clickBad");
    //ryd op, så man ikke kan klikke på den samme flere gange
    this.removeEventListener("mousedown", clickBad);

    //frys (pause), flyv-animationen 
    this.classList.add("frys");

    // TODO: Spil lyde



    //her styrer til point - den første kan ligge 1 til, de to næste kan ligge flere point til alt efter hvad man skriver. 
    /* points++; 
       points += 5;
    */

    points = points + 1;
    document.querySelector("#score_board").innerHTML = points

    if (points >= 2) {
        console.log("points >= 2")
    } else {
        console.log("points==2")
    }

    //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
    this.firstElementChild.classList.add("forsvind");

    //Lyt efter Forsvind-animationer er færdig
    this.addEventListener("animationend", genstartBad);
}

function genstartBad() {
    console.log("genstartBad");

    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte flyv animationen, da vi fjener og tilføjer den i samme function
    this.offsetLeft;

    //random karin//
    myRand = Math.floor(Math.random() * 4) + 1;
    console.log(myRand);

    //Giv en position til container
    this.classList.add("pos" + myRand);

    myRand = Math.floor(Math.random() * 4) + 1;
    console.log(myRand);

    //giv ny tilfældig speed///
    this.classList.add("speed" + myRand);

    //Start flyv-animationer på element
    this.classList.add("fade_in");

    //Lyt efter klik på element
    this.addEventListener("mousedown", clickBad);
}

function clickGood() {
    console.log("clickGood");
    //ryd op, så man ikke kan klikke på den samme flere gange
    this.removeEventListener("mousedown", clickGood);

    //frys (pause), flyv-animationen 
    this.classList.add("frys");

    //indsæt lyde her 

    //tæl liv nedad + gør grå når man trykker på good
    console.log("#Liv = " + liv);
    document.querySelector("#liv" + liv).classList.add("gray");

    liv--;
    console.log("#Liv er nu =" + liv);

    points = points - 1;
    document.querySelector("#score_board").innerHTML = points


    //Start forsvind_roter-animationer på sprite element (firstElementChild er sprite elementet)
    this.firstElementChild.classList.add("forsvind_roter");

    //Lyt efter forsvind_roter-animationer er færdig
    this.addEventListener("animationend", genstartGood);

    if (liv <= 0) {
        stopSpillet();
    }
}

function genstartGood() {
    console.log("genstartGood");
    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte flyv animationen, da vi fjener og tilføjer den i samme function
    this.offsetLeft;

    //random karin//
    myRand = Math.floor(Math.random() * 4) + 1;
    console.log(myRand);

    //Giv en position til container
    this.classList.add("pos" + myRand);

    myRand = Math.floor(Math.random() * 4) + 1;
    console.log(myRand);

    //giv ny tilfældig speed///
    this.classList.add("speed" + myRand);

    //Start flyv-animationer på element
    this.classList.add("fade_in");

    //Lyt efter klik på element
    this.addEventListener("mousedown", clickGood);
}


function stopSpillet() {
    console.log("stopSpillet");

    /*//fjern alt på alle container og sprite
    document.querySelector("#bad_container").classList = "";
    document.querySelector("#bad_container").classList = "";
    document.querySelector("#good_container").classList = "";
    document.querySelector("#good_sprite").classList = "";

    document.querySelector("#bad_container").removeEventListener("animationiteration", genstartBad);
    document.querySelector("#bad_container").removeEventListener("mousedown", clickBad);
    document.querySelector("#Bad_container").removeEventListener("animationend", genstartBad);


    document.querySelector("#good_container").removeEventListener("animationiteration", genstartGood);
    document.querySelector("#good_container").removeEventListener("mousedown", clickGood);
    document.querySelector("#good_container").removeEventListener("animationend", genstartGood); */



    //de dårlige//
    badContainer1.classList = "";
    badContainer1.firstElementChild.classList = "";
    badContainer1.removeEventListener("animationiteration", genstartBad);
    badContainer1.removeEventListener("mousedown", clickBad);
    badContainer1.removeEventListener("animationend", genstartBad);

    badContainer2.classList = "";
    badContainer2.firstElementChild.classList = "";
    badContainer2.removeEventListener("animationiteration", genstartBad);
    badContainer2.removeEventListener("mousedown", clickBad);
    badContainer2.removeEventListener("animationend", genstartBad);

    badContainer3.classList = "";
    badContainer3.firstElementChild.classList = "";
    badContainer3.removeEventListener("animationiteration", genstartBad);
    badContainer3.removeEventListener("mousedown", clickBad);
    badContainer3.removeEventListener("animationend", genstartBad);



    //de gode// 

    goodContainer1.classList = "";
    goodContainer1.firstElementChild.classList = "";
    goodContainer1.removeEventListener("animationiteration", genstartGood);
    goodContainer1.removeEventListener("mousedown", clickGood);
    goodContainer1.removeEventListener("animationend", genstartGood);

    goodContainer2.classList = "";
    goodContainer2.firstElementChild.classList = "";
    goodContainer2.removeEventListener("animationiteration", genstartGood);
    goodContainer2.removeEventListener("mousedown", clickGood);
    goodContainer2.removeEventListener("animationend", genstartGood);

    goodContainer3.classList = "";
    goodContainer3.firstElementChild.classList = "";
    goodContainer3.removeEventListener("animationiteration", genstartGood);
    goodContainer3.removeEventListener("mousedown", clickGood);
    goodContainer3.removeEventListener("animationend", genstartGood);




    document.querySelector("#tid_sprite").removeEventListener("animationend", stopSpillet);
    document.querySelector("#tid_sprite").classList.remove("time");


    if (liv <= 0) {
        gameover();
    } else if (points >= 6) {
        levelcomplete();
    } else {
        gameover();
    }

}


function gameover() {
    genstart1Knap.addEventListener("click", startGame)
    console.log("gameover");
    gameOverScreen.classList.remove("skjul");
    gameOverPoints.innerHTML = points;
    timer.firstElementChild.classList.remove("tid");

}

function levelcomplete() {
    genstart2Knap.addEventListener("click", startGame)
    console.log("levelcomplete");
    lvlComScreen.classList.remove("skjul");
    lvlComPoints.innerHTML = points;
    timer.firstElementChild.classList.remove("tid");
}
