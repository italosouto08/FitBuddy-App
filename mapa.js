
$.getJSON("Academias.json", function(data) {

    var latitudes = [];
    var longitudes = [];
    var nomesPolos = [];
    var nomeRua = [];
    var nomeBairro = [];
    var complemento = [];

  
 
    for (var i = 0; i < data.records.length; i++) {
      var record = data.records[i];

      latitudes.push(record[7]);
      longitudes.push(record[8]);
      nomesPolos.push(record[1]);
      nomeRua.push(record[3]);
      nomeBairro.push(record[4]);
      complemento.push(record[5]);
    }
  

    var map = L.map('map').setView([-8.047562, -34.877002], 13); 
  

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  

    for (var i = 0; i < latitudes.length; i++) {
      var marker = L.marker([latitudes[i], longitudes[i]]).addTo(map);

      var popupContent = "Nome do Polo: " + nomesPolos[i] + "<br>" +
                         "Rua: " + nomeRua[i] + "<br>" +
                         "Bairro: " + nomeBairro[i] + "<br>" +
                         "Complemento: " + complemento[i];

      marker.bindPopup(popupContent);
    }


      var userMarker;
      navigator.geolocation.watchPosition(function(position) {
      var userLat = position.coords.latitude;
      var userLng = position.coords.longitude;
  

      var customIcon = L.icon({
        iconUrl: './Assets/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });


      if (!userMarker) {
        userMarker = L.marker([userLat, userLng], { icon: customIcon }).addTo(map);
        userMarker.bindPopup("Sua Localização").openPopup();
      } else {
        userMarker.setLatLng([userLat, userLng]);
      }
  

      map.setView([userLat, userLng], 13);
    });
  });