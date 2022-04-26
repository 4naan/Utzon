

//creates the cost list
function addRateList() {
    let ratelist = document.createElement("li");
    ratelist.innerHTML = "<select><option>Council Rates</option><option>Strata fees</option></select><input placeholder='Enter amount per month'></input>";
    ratelist.classList.add("itemised-costs");
    document.getElementById("listed-costs-ul").appendChild(ratelist);
    let span = document.createElement("a");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    ratelist.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

export { addRateList };