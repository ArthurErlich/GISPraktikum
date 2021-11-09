namespace Aufgabe3_1 {

  //varebles to edit my consol programm
  const consolTEXT = document.getElementById("consolTEXT");
  const consolTEXT2 = document.getElementById("consolTEXT2");

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
  consolTEXT2.innerHTML += "Lösung a): <br>" + String(events.length) + "<br><br>";

  // Lösung b) ...
  consolTEXT2.innerHTML += "Lösung b): <br>";
  for (let x: number = 0; x < events.length; x++) {
    for (let y: number = 0; y < events[x].length; y++) {
      consolTEXT2.innerHTML += " " + events[x][y];
    }
    consolTEXT2.innerHTML += "<br> ";
  }
  consolTEXT2.innerHTML += "<br> ";

  // Lösung c) ...
  consolTEXT2.innerHTML += "Lösung c): <br>";
  consolTEXT2.innerHTML += tickitPrice(events) + "<br><br>";


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
  consolTEXT2.innerHTML += "Lösung d): <br>";
  consolTEXT2.innerHTML += searchName(events, "Pink Floyd");
  //convert to string upper or lowercase -->
function searchName(events:any, name:string): string {
  return "test"
}
  // Lösung e) ...

  // Lösung f) ...

  // Lösung g) ...

  // Lösung h) ...

}