var map = L.map('map').setView([55.8588, -4.2479], 13);

L.tileLayer(
    'http://{s}.tile.cloudmade.com/220281b868f44269a6065071612c1e30/997/256/{z}/{x}/{y}.png',
    {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
    }).addTo(map);