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

//Định dạng các style cho point, line và polygon
var pointclickedStyle = L.icon({
    iconUrl: './assets/leaflet/images/redicon.png',
    shadowUrl: './assets/leaflet/images/marker-shadow.png',
    iconSize:     [30, 50], // size of the icon
    shadowSize:   [35, 55], // size of the shadow
    iconAnchor:   [15, 45], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 60],  // the same for the shadow
    popupAnchor:  [5, -30] // point from which the popup should open relative to the iconAnchor
});

var pointdefaultStyle = L.icon({
    iconUrl: './assets/leaflet/images/marker-icon.png',
    shadowUrl: './assets/leaflet/images/marker-shadow.png',
    iconSize:     [30, 50], // size of the icon
    shadowSize:   [35, 55], // size of the shadow
    iconAnchor:   [15, 45], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 60],  // the same for the shadow
    popupAnchor:  [5, -30] // point from which the popup should open relative to the iconAnchor
});

var lineStyle={color: "blue", weight: 2};
var polygonStyle={color: "red", fillColor: "yellow", weight: 4};

var geturl = './getGeo?format=GeoJSON&q=' //Url lấy data dạng GeoJSON
var sql = "SELECT Id,  AsText(geometry) AS wkt, name, type, address, website, phone_number, img FROM location";

$.getJSON(geturl + sql, function(data){ setMap(data) });

const info = document.querySelector(".feature_menu");
const infoClose = document.querySelector(".fcontrol")

infoClose.addEventListener('click',function(){
    info.classList.remove('active');
    infoClose.classList.remove('active');
});

const featureName = document.querySelector("#feature_name");
const featureType = document.querySelector("#feature_type");
const featureAddress = document.querySelector("#feature_address");
const featureWebsite = document.querySelector("#feature_website");
const featurePhone = document.querySelector("#feature_phone");
const featureImg = document.querySelector(".feature_img img")


function featureData(feature){
    if (feature.properties){
        if (feature.properties.name) featureName.replaceChildren(feature.properties.name);
        if (feature.properties.type) featureType.replaceChildren(feature.properties.type);
        if (feature.properties.address) featureAddress.replaceChildren(feature.properties.address);
        if (feature.properties.website) {featureWebsite.setAttribute('href',feature.properties.website);
            featureWebsite.replaceChildren(feature.properties.website);
        }
        if (feature.properties.phone_number) featurePhone.replaceChildren(feature.properties.phone_number);
        if (feature.properties.img) featureImg.src="./images/"+feature.properties.img;
            else featureImg.src="/assets/images/default_img.png";
    }
}

function setMap(data){
    L.geoJSON(data, {
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'LineString':   return lineStyle;
                case 'Polygon':   return polygonStyle;
            }
        },
        onEachFeature: function(feature,layer){
            layer.on('click', function(e){
                
                info.classList.add('active');
                infoClose.classList.add('active');
                featureData(feature);
            });
            layer.on("mouseover",function(e){
                layer.setIcon(pointclickedStyle);
            });
            layer.on("mouseout",function(e){
                layer.setIcon(pointdefaultStyle)
            });
        }
    }).addTo(layerObject);
}