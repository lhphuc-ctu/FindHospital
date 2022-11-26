//Ban do nen
var map = L.map('map').setView([10.031021579004767, 105.76911459944654], 13);

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


function featureData(feature){
    if (feature.properties){
        if (feature.properties.name) featureName.replaceChildren(feature.properties.name);
        if (feature.properties.type) featureType.replaceChildren(feature.properties.type);
        if (feature.properties.address) featureAddress.replaceChildren(feature.properties.address);
        if (feature.properties.website) featureWebsite.replaceChildren(feature.properties.website);
        if (feature.properties.phone_number) featurePhone.replaceChildren(feature.properties.phone_number);
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

//Thêm điều khiển vẽ; Icon mặc nhiên trong thư mục css/images
var drawnItems = L.featureGroup().addTo(map);
new L.Control.Draw({ edit: { featureGroup: drawnItems }, position: "topright" }).addTo(map);

//layer để giữ đối tượng đang vẽ hoặc đang được chọn
var layer=new L.Layer();

//Tạo nút lệnh Save
var control = L.control({position: "topright"});
control.onAdd = function(map) {
    var div = L.DomUtil.create("div", "leaflet-draw-toolbar leaflet-bar");
    div.innerHTML = '<button type="button" class="save-btn" id="save"><i class="fa-solid fa-floppy-disk"></i></button>';
    return div;
};
control.addTo(map);

const add = document.querySelector(".addfeature_menu");
const submitbtn = document.querySelector(".addform #submit");
const addcose = document.querySelector(".addfcontrol")


function addShow(){
    add.classList.add('active');
    addcose.classList.add('active');
}

function addHide(){
    add.classList.remove('active');
    addcose.classList.remove('active');
}

addcose.addEventListener('click', addHide);

//Khi vẽ thì thêm vào lớp drawnItems
map.on("draw:created", function(e) {
    layer=e.layer;
    layer.addTo(drawnItems);
    addShow();
    layer.on('click', addShow);
});

function filename(path){
    sub = path.lastIndexOf('\\')+1;
    res = path.substr(sub,path.length) ?? "";
    return res;
}

submitbtn.addEventListener("click", function(){
    addHide();
    layer.feature={};
    layer.feature.type="Feature";
    layer.feature.properties={};
    layer.feature.properties.name=$("#name").val();
    layer.feature.properties.type=$("#type").val();
    layer.feature.properties.img=filename($("#img").val());
    layer.feature.properties.address=$("#address").val();
    layer.feature.properties.website=$("#website").val();
    layer.feature.properties.phone_number=$("#phone_number").val();
});
			
var seturl = "./setGeo";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$("#save").on("click", function() {
    drawnItems.eachLayer(function(layer) {
        var drawing = JSON.stringify(layer.toGeoJSON().geometry), geo=layer.toGeoJSON();

        var sql2 = "INSERT INTO location (geometry, name, type, address, website, phone_number, img) VALUES ("+
            "ST_GeomFromGeoJSON('" + drawing + "'), '" 
            + geo.properties.name + "', '" 
            + geo.properties.type + "', '" 
            + geo.properties.address + "', '" 
            + geo.properties.website + "', '" 
            + geo.properties.phone_number + "', '" 
            + geo.properties.img + "')"; 
            
        $.post({
            url: seturl,
            data: {"q": sql2},
            dataType: "json",
            success: function() {
                alert("Thêm thành công!");
                reload();
            },  
            error: function() {
                alert("Có lỗi xảy ra!");
            }
        });
    });
    drawnItems.clearLayers();
});

function reload() {
    layerObject.clearLayers();
    $.getJSON(geturl + sql, function(data){ setMap(data) });

    $("#combobox1").empty();
    $.getJSON(geturl2 + sql3, function(data) {
        var menu = $("#combobox1");
        menu.append("<option value=''>Chọn đối tượng</option>");
        $.each(data, function(key, value) {
            menu.append("<option value="+value.id+">" + value.name + "</option>");
        });
    });
};
//Xoa
//Thêm điều khiển mới là combo box rỗng lên bản đồ
var control1 = L.control({position: "topleft"});
control1.onAdd = function(map) {
var div = L.DomUtil.create("div", "div1");
div.innerHTML = '<select id="combobox1"></select> <button id="delete">Xoá</button>';
return div;
};
control1.addTo(map);

//Lấy giá trị của cột Name không trùng thêm vào combo box
var sql3 = "SELECT id, name FROM location ORDER BY name";
var geturl2 ="./getGeo?q=";

$.getJSON(geturl2 + sql3, function(data) {
var menu = $("#combobox1");
menu.append("<option value=''>Chọn đối tượng</option>");
$.each(data, function(key, value) {
    menu.append("<option value="+value.id+">" + value.name + "</option>");
});
});

var deleteurl = "./deleteGeo";
$("#delete").on("click", function() {
var valueSelected = $("#combobox1").val();
if(valueSelected!=''){
    var sql4 = "DELETE FROM `location` WHERE id="+valueSelected;
    $.post({
        url: deleteurl,
        data: {"q": sql4},
        dataType: "json",
        success: reload,
        error: function() {
            alert("Có lỗi xảy ra khi xoá dữ liệu");
        }
    });
}
else{
    alert("Đối tượng không hợp lệ")
}

});