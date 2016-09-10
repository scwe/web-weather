function getImage(text){
    switch (text) {
        case "Sunny":
            return "icon-sunny";
        case "Mostly Sunny":
            return "icon-partly-sunny";
        case "Clear":
            return "icon-sunny";
        case "Breezy":
            return "icon-wind";
        case "Mostly Clear":
            return "icon-partly-sunny";
        case "Cloudy":
            return "icon-cloudy";
        case "Partly Cloudy":
            return "icon-partly-sunny";
        case "Mostly Cloudy":
            return "icon-cloudy";
        case "Rain":
            return "icon-rain";
        case "Thunderstorms":
            return "icon-thunderstorm";
        case "Scattered Thunderstorms":
            return "icon-thunderstorm-sun";
        default:
            console.log("Couldn't figure out: "+text);
            return "close";
    }
}

function formatTime(time){
    var hour = time.split(":")[0];
    var minutes = parseInt(time.split(":")[1].split(" ")[0]);
    var am = time.split(" ")[1];

    return hour +":"+minutes.toPrecision(2)+am;
}

module.exports = {
    getImage: getImage,
    formatTime: formatTime
};
