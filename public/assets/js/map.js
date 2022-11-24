//Ban do
var map = L.map('map').setView([10.031021579004767, 105.76911459944654], 13);

//Ban do nen
var mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'map&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
mapLayer.addTo(map);

// Create additional Control placeholders
function addControlPlaceholders(map) {
    var corners = map._controlCorners,
        l = 'leaflet-',   
        container = map._controlContainer;

    function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;

        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
}
addControlPlaceholders(map);

// Change the position of the Zoom Control to a newly created placeholder.
map.zoomControl.setPosition('verticalcenterright');

// You can also put other controls in the same placeholder.
L.control.scale({position: 'verticalcenterright'}).addTo(map);

var layerObject = L.layerGroup().addTo(map);

var lineStyle={color: "blue", weight: 2};
var polygonStyle={color: "red", fillColor: "yellow", weight: 4};

var url = './getGeo?format=GeoJSON&q=' //Url lấy data dạng GeoJSON

var sql = "SELECT Id,  AsText(geometry) AS wkt, name FROM location";
$.getJSON(url + sql, function(data) {
    L.geoJSON(data, {
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'LineString':   return lineStyle;
                case 'Polygon':   return polygonStyle;
            }
        },
        onEachFeature: function(feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.bindPopup("<i>" + feature.properties.name + "</i>");
            }
        }
    }).addTo(layerObject);
});