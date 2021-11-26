namespace Aufgabe5_Zusatz {

    class Time {
        micro: number
        sec: number;
        min: number;

        constructor() {
            this.micro = 0;
            this.sec = 0;
            this.min = 0;
        }
    }

    let clock: HTMLElement;
    let start: HTMLElement;
    let pause: HTMLElement;
    let reset: HTMLElement;

    let timer: number;
    let time = new Time();

    if (localStorage.getItem("0") !== null) {
        time.micro = JSON.parse(localStorage.getItem("0")).micro -1;
        time.sec = JSON.parse(localStorage.getItem("0")).sec;
        time.min = JSON.parse(localStorage.getItem("0")).min;
    }

    getElemtns();
    clockTime();

    function getElemtns() {
        clock = document.getElementById("clock");
        start = document.getElementById("start");
        pause = document.getElementById("pause");
        reset = document.getElementById("reset");

        start.addEventListener("click", startTimer);
        pause.addEventListener("click", pauseTimer);
        reset.addEventListener("click", resetTImer);

    }

    function clockTime() {
        clock.innerText = toString();
        calculateTime();
    }
    function startTimer() {
        timer = setInterval(clockTime, 10);

    }
    function pauseTimer() {
        clearInterval(timer);
        saveContent();
    }
    function resetTImer() {
        clearInterval(timer);
        time.micro = 0;
        time.min = 0;
        time.sec = 0;
        timer = 0;
        clockTime()
        localStorage.clear();
    }

    function toString(): string {
        let min = time.min;
        let sec = time.sec;
        let micro = time.micro;
        let out = "";

        if (min <= 9) {
            out += "0" + min;
        } else {
            out += "" + min;
        }
        if (sec <= 9) {
            out += ":0" + sec;
        } else {
            out += ":" + sec;
        }
        if (micro <= 9) {
            out += ":0" + micro;
        } else {
            out += ":" + micro;
        }
        return out;
    }

    function calculateTime() {
        time.micro += 1;
        if (time.micro >= 100) {
            time.micro = 0;
            time.sec += 1;

        } else if (time.sec >= 60) {
            time.sec = 0;
            time.min += 1;

        } else if (time.min >= 60) {
            console.log(60 + " Mins are gone");
        }

    }
   function saveContent(){
        localStorage.setItem("0",JSON.stringify(time));
    }
}

