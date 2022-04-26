
const vowelDetector = (e) => {
    let fl = e.charAt(0).toLowerCase();
    if (fl === 'a' || fl === 'u' || fl === "i" || fl === "o" || fl === "u") {
        return ('an');
    } else {
        return ('a');
    }
}
export { vowelDetector };