"use strict";
var Aufgabe3_1;
(function (Aufgabe3_1) {
    //a vareble to edit my consol programm
    const consolTEXT = document.getElementById("consolTEXT");
    const consolTEXT2 = document.getElementById("consolTEXT2");
    // -- [Aufgabe 1]
    /**
     * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
     */
    let age = 24;
    /**
     * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
     */
    let firstName = `Arthur`;
    function func1(age) {
        return 2021 - age;
    }
    let output = func2(firstName);
    function func3(meal) {
        //console.log(`Ich esse gerne ${meal || "Pizza"}.`);
        consolTEXT.innerHTML += `Ich esse gerne ${meal || "Pizza"}.` + "<br>";
        return func1(age) > 1995
            ? `Ich gehöre zur Generation Z`
            : `Ich gehöre zur Generation Y`;
    }
    //console.log(output);
    consolTEXT.innerHTML += output + "<br>";
    function func2(name) {
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
    let events = [
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
    // Lösung b) ...
    // Lösung c) ...
    // Lösung d) ...
    // Lösung e) ...
    // Lösung f) ...
    // Lösung g) ...
    // Lösung h) ...
})(Aufgabe3_1 || (Aufgabe3_1 = {}));
//# sourceMappingURL=script_vorlage1.js.map