import * as d3 from 'd3-fetch'
import L from 'leaflet'

const map = L.map('map').setView([40.7236, -73.9833], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiemhpayIsImEiOiJjaW1pbGFpdHQwMGNidnBrZzU5MjF5MTJiIn0.N-EURex2qvfEiBsm-W9j7w'
}).addTo(map);

d3.json('public/routes.geojson').then(routes => {
    //filter points and lines
    const points = routes.features.filter(feature => feature.geometry.type === "Point")
    const lines = routes.features.filter(feature => feature.geometry.type === "LineString")

    L.geoJSON(lines, {
        style: feature => ({color: feature.properties.color})
    }).addTo(map);

    L.geoJSON(points, {
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 6,
                fillColor: "white",
                color: "#000",
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            });
        },
        onEachFeature: (feature, layer) => {
            const props = feature.properties;
            layer.bindPopup(`
                <h3><a href="${props.event_url}">${props.name}</a></h3>
                <p><strong>Description:</strong> ${props.description}</p>
                <p><strong>Dates:</strong> ${props.dates}</p>
                <p><strong>From:</strong> ${props.start}</p>
                <p><strong>Via/To:</strong> ${props.end}</p>
                
            `);
        }
    }).addTo(map);

    // //generate route info
    // const infobox = document.getElementById('infobox')
    // const list = document.createElement('ul')
    //
    // points.forEach(point => {
    //     const listItem = document.createElement('li')
    //     const props = point.properties
    //     listItem.innerHTML = `<p><a href="${props.event_url}">${props.name}</a></p>`
    //     list.appendChild(listItem)
    // })
    //
    // infobox.appendChild(list)

})