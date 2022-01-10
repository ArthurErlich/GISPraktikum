namespace Pruefung {
    //NICE
    let test: URLSearchParams = new URLSearchParams(window.location.search);
    console.log(test.get("id"));
}