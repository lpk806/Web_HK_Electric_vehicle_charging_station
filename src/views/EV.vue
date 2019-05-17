<template>
<div class="map">
  <div class="google-map" id="map"></div>


  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      max-width="290"
      dark
    >
      <v-card>
        <v-card-title class="headline">{{ location }}</v-card-title>
        <hr>
        <v-card-text>詳細地址:{{address}} <br> 
        充電類別:{{type}} <br>
        提供機構:{{provider}}<br>
        充電車位號碼:{{parkingNo}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            icon=""
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
            v-bind:href="link"
          >
           帶我去
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

    <v-layout row>

      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list subheader>
            <v-subheader>電動車充電站</v-subheader>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import EVJson from "../assets/data/EV.json";
export default {
  data() {
    return {
      lat: 22.376548, 
      lng: 114.140749,
      dialog: false,
      location:null,
      address:null,
      provider:null,
      parkingNo:null,
      type:null,
      link:null
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 17,
        maxZoom: 18,
        minZoom: 3,
        streetViewControl:false,
       
      });
       
      let data = EVJson.stationList;
      console.log(data);
     var markers = [];
      for (let i = 0; i < data.length; i++) {
        let marker = new google.maps.Marker({
          position: {
            lat: Number(data[i].lat),
            lng: Number(data[i].lng)
          },
          icon:'https://i.ibb.co/kMQFmY5/twotone-ev-station-black-18dp.png',
          map: map
        });
        marker.addListener("click", () => {
          this.dialog = true;
          this.location = data[i].location;
          this.address = data[i].address;
          this.provider= data[i].provider;
          this.type = data[i].type;
          this.link = "https://www.google.com/maps/dir/?api=1&destination="+Number(data[i].lat)+","+Number(data[i].lng)+"&travelmode=driving";
          if(data[i].parkingNo == null || data[i].parkingNo == ""){
            this.parkingNo ="沒有資料提供";
          }else{
          this.parkingNo = data[i].parkingNo;
          }
        });
        markers.push(marker);
      }
      var markerCluster = new MarkerClusterer(map, markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
  },    
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          this.renderMap();
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        {
          maximumAge: 60000,
          timeout: 3000
        }
      );  
    } else {
      this.renderMap();
    }
  }
};
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
}
</style>