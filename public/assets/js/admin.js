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
var pointStyle = L.icon({
    iconUrl: './assets/leaflet/images/redicon.png',
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
var sql = "SELECT Id,  AsText(geometry) AS wkt, name FROM location";
$.getJSON(geturl + sql, function(data) {
    L.geoJSON(data, {
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'LineString':   return lineStyle;
                case 'Polygon':   return polygonStyle;
            }
        },
        // pointToLayer: function (feature, latlng){
        //     return L.marker(latlng, {icon:pointStyle});			
        // },
        onEachFeature: function(feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.bindPopup("<i>" + feature.properties.name + "</i>");
            }
        }
    }).addTo(layerObject);
});

//Thêm điều khiển vẽ; Icon mặc nhiên trong thư mục css/images
//https://cdnjs.com/libraries/leaflet.draw
var drawnItems = L.featureGroup().addTo(map);
new L.Control.Draw({ edit: { featureGroup: drawnItems }}).addTo(map);

//layer để giữ đối tượng đang vẽ hoặc đang được chọn
var layer=new L.Layer();

//Tạo nút lệnh Save
var control = L.control({position: "topright"});
control.onAdd = function(map) {
    var div = L.DomUtil.create("div", "divsave");
    div.innerHTML = '<input type="button" id="save" value="Save">';
    return div;
};
control.addTo(map);

//Khi vẽ thì thêm vào lớp drawnItems
map.on("draw:created", function(e) {
    layer=e.layer;
    layer.addTo(drawnItems);
    var popupContent = 
        '<form>' + 
        'Name:<br><input type="text" id="input_name" value=""><br>' +
        '<input type="button" value="Submit" id="submit">' + 
        '</form>';
    layer.bindPopup(popupContent).openPopup();
    
});

drawnItems.on('popupopen', function (e){
    layer=e.layer;
});				

$("body").on("click", "#submit", addprops);

var seturl = "./setGeo";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$("#save").on("click", function() {
    drawnItems.eachLayer(function(layer) {
        var drawing = JSON.stringify(layer.toGeoJSON().geometry),
            geo=layer.toGeoJSON();

        var sql2 = 
        "INSERT INTO dulieumau (the_geom, name) " + 
        "VALUES (ST_GeomFromGeoJSON('" + 
        drawing + "'), '" + geo.properties.name + "')";

        $.post({
            url: seturl,
            data: {"q": sql2},
            dataType: "json",
            success: reloadMap,
            error: function() {
                alert("Có lỗi xảy ra khi lưu dữ liệu");
                console.log("Problem saving the data");
            }
        });
        L.geoJSON(layer.toGeoJSON(),{
            onEachFeature:function(feature,layer){
                layer.bindPopup(layer.feature.properties.name);
            }
        }).addTo(layerObject);
        
    });
    drawnItems.clearLayers();
});

function reloadMap() {
    layerObject.clearLayers();
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
                    layer.bindPopup("<i>" + feature.properties.name + "</i> <button>XX</button>");
                }
            },
            pointToLayer:function(feature,latlng){
                return L.marker(latlng, {icon:pointStyle});
            }
        }).addTo(layerObject);
    });

    $("#combobox1").empty();
    $.getJSON(url3 + sql3, function(data) {
        var menu = $("#combobox1");
        menu.append("<option value=''>Chọn đối tượng</option>");
        $.each(data, function(key, value) {
            menu.append("<option value="+value.id+">" + value.name + "</option>");
        });
    });
};
function addprops(){
    layer.feature={};
    layer.feature.type="Feature";
    layer.feature.properties={};
    layer.feature.properties.name=$("#input_name").val();
    layer.closePopup();
    var popup = layer.getPopup(),
        content = popup.getContent(),
        start=content.indexOf('id="input_name"',0),
        end=content.indexOf('>',start),
        l=content.substr(0,start);
        r=content.substr(end,content.length);
        console.log(content);
    content=l+'id="input_name" value="'+$("#input_name").val()+'"'+r;
    
    layer.bindPopup(content).closePopup();
}
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
var sql3 = "SELECT id, name FROM dulieumau ORDER BY name";
var url3 ="./getdata?q=";

$.getJSON(url3 + sql3, function(data) {
var menu = $("#combobox1");
menu.append("<option value=''>Chọn đối tượng</option>");
$.each(data, function(key, value) {
    menu.append("<option value="+value.id+">" + value.name + "</option>");
});
});

var url4 = "./delete";
$("#delete").on("click", function() {
var valueSelected = $("#combobox1").val();
if(valueSelected!=''){
    var sql4 = "DELETE FROM `dulieumau` WHERE id="+valueSelected;
    $.post({
        url: url4,
        data: {"q": sql4},
        dataType: "json",
        success: reloadMap,
        error: function() {
            alert("Có lỗi xảy ra khi xoá dữ liệu");
        }
    });
}
else{
    alert("Đối tượng không hợp lệ")
}

});