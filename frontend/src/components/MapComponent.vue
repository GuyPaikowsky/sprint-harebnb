<template>
  <!--    <div id="map" class="map-container"></div>-->

  <p v-for="stay in stays" :key="stay._id">
    {{ stay.name }} <!-- assuming 'name' is a valid property on your stay objects -->
  </p>


</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import { mapState } from 'vuex'

export default {
  name: 'MapComponent',
  props: {
    stays: Array
  },
  data() {
    return {
      map: null,
      markers: null,
      myLatLng: {
        lat: 40,
        lng: -100
      },
    }
  },
  mounted() {
    // console.log(this.stays)

    this.initMap().then(() => {
      this.getUserLocation()
    })
  },
  computed: {
    ...mapState(['stays'])
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.displayUserLocation)
      } else {
        console.error('Geolocation not supported by this browser')
      }
    },
    displayUserLocation(position) {
      const userLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      if (this.map) {
        this.map.setCenter(userLatLng)
      } else {
        console.error('Map issue')
      }
    },
    async initMap() {
      const loader = new Loader({
        apiKey: 'AIzaSyA02MW7hFp3ut-pygN5y8a9BZCaS4Vsgfc',
        version: 'weekly'
      })
      try {
        await loader.load()
        const { Map } = await google.maps.importLibrary('maps')
        this.map = new Map(document.getElementById('map'), {
          zoom: 4,
          center: this.myLatLng,
          fullScreenControl: false,
          zoomControl: true,
          streetViewControl: true
        })
      } catch (err) {
        console.error('error loading google maps!', err)
      }
    }
  },

}
</script>

<style scoped lang="scss">
.map-container {
  height: 80vh;
  width: 100%;
}
</style>
