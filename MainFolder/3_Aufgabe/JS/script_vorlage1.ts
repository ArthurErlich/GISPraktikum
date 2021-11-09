namespace Aufgabe3_1 {

  //varebles to edit my consol programm
  const consolTEXT = document.getElementById("consolTEXT");
  const consolTEXT2 = document.getElementById("consolTEXT2");
  let outString: string = ""

  // -- [Aufgabe 1]

  /**
   * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
   */
  let age: number = 24;

  /**
   * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
   */
  let firstName: string = `Arthur`;

  function func1(age: number): number {
    return 2021 - age;
  }

  let output: string = func2(firstName);

  function func3(meal?: string): string {
    //console.log(`Ich esse gerne ${meal || "Pizza"}.`);
    consolTEXT.innerHTML += `Ich esse gerne ${meal || "Pizza"}.` + "<br>";

    return func1(age) > 1995
      ? `Ich gehöre zur Generation Z`
      : `Ich gehöre zur Generation Y`;
  }

  //console.log(output);
  consolTEXT.innerHTML += output + "<br>";

  function func2(name: string): string {
    //console.log(`Ich heiße ${name}.`);
    consolTEXT.innerHTML += `Ich heiße ${name}.` + "<br>";
    return func3();
  }

  /* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
   * func2
   * func1
   * func3
   */

  // -- [Aufgabe 2]

  let events: any[][] = [
    ["Mark Knopfler", 10.1],
    ["Pink Floyd", 15.9],
    ["Metallica", 20.1],
    ["Michael Bublé", 11.1],
    ["Dire Straits", 12.2],
    ["Mariah Carey", 1.1],
    ["Cat Stevens", 12.99],
    ["Mark Forster", 2.1],
    ["Helene Fischer", 3.1],
    ["Bee Gees", 25.2],
  ];

  // -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 2 EINTRAGEN

  // Lösung a) ...
  outString += "Lösung a): <br>" + String(events.length) + "<br><br>";

  // Lösung b) ...
  outString += "Lösung b): <br>";
  for (let x: number = 0; x < events.length; x++) {
    for (let y: number = 0; y < events[x].length; y++) {
      outString += " " + events[x][y];
    }
    outString += "<br> ";
  }
  outString += "<br> ";

  // Lösung c) ...
  outString += "Lösung c): <br>";
  outString += tickitPrice(events) + "<br><br>";


  function tickitPrice(localEvents: any[][]): string {

    let maxPrice: any[][] = [["Test", 1]];

    for (let x: number = 0; x < localEvents.length; x++) {
      for (let y: number = 0; y < localEvents[x].length; y++) {
        if (parseFloat(localEvents[x][y]) > parseFloat(maxPrice[0][1])) {
          maxPrice[0][0] = localEvents[x][y - 1];
          maxPrice[0][1] = localEvents[x][y];
        }
      }
    }
    return maxPrice[0][0] + " " + maxPrice[0][1];
  }

  // Lösung d) ...
  let name: string = "Pink Floyd";
  outString += "Lösung d): <br>" + "eingabe war: " + name + "<br>";
  outString += searchName(events, name) + "<br><br>";

  function searchName(localEvents: any[][], name: string): boolean {

    let nameList: string[] = [];
    name = name.toUpperCase();

    for (let x: number = 0; x < localEvents.length; x++) {
      nameList[x] = localEvents[x][0];
      nameList[x] = nameList[x].toUpperCase();

      if (name == nameList[x]) {
        return true;
      }
    }

    return false;
  }
  // Lösung e) ...
  outString += "Lösung e): <br>"
  factoial(4);
  factoial(5);
  factoial(10);
  function factoial(n: number) {
    let index: number = 1;
    let iterate: number = n;

    while (index < iterate) {
      outString += index + " * ";

      n = n * index;
      index++;

    }
    outString += index + " = " + n + "<br>";
  }
  // Lösung f) ...
  outString += " <br> Lösung f): <br>This Numbers are tileable with 3 <br> "
  for (let i: number = 1; i <= 100; i++) {

    if (i % 3 == 0) {
      outString += i + "\t \t";
    }
    if (i % 10 == 0) {
      outString += "<br>";
    }
  }

  // Lösung g) ...
  outString += "<br> Lösung g): <br>";
  class ConcertEvent {
    interpret: string = "";
    price: number = 0;

    constructor(interpret: string, price: number) {
      this.interpret = interpret;
      this.price = price;
    }
    show() {
      outString += this.interpret + " " + this.price + "<br>";
    }
  }
  	
  outString += ` <p style="color: green;">class ConcertEvent { <br>
    interpret: string = ""; <br>
    price: number = 0; <br>
    <br>
    constructor(interpret: string, price: number) { <br>
      this.interpret = interpret; <br>
      this.price = price; <br>
    } <br>
    show() { <br>
      outString += this.interpret + " " + this.price + "br"; <br>
    }
  }; <br> </p>`
  // Lösung h) ... 
  
  let eventList: ConcertEvent[] = new Array(events.length);


  for (let x: number = 0; x < events.length; x++) {
    for (let y: number = 0; y < events[x].length; y++) {
      eventList[x]= new ConcertEvent(events[x][y - 1],events[x][y]);
    }
  }
  eventList.forEach(element => {
    element.show();
  });

  //Outupt zur konsole--> edit dom elemnt
  consolTEXT2.innerHTML = outString;
}
