<template>
  <li class="stay-preview">
    <swiper class="mySwiper"
            :pagination="{ clickable: false }"
            :modules="modules"
            :navigation="true"
            :space-between="0"
            :speed="550"
            watchOverflow>
      <SwiperSlide v-for="(imgUrl, index) in stay.imgUrls" :key="index" class="carousel-image-container">
        <img class="carousel-image" :src="imgUrl" alt="Stay Image"/>
      </SwiperSlide>
    </Swiper>

    <div class="stay-description">
      <h1 class="stay-location">{{ stay.loc.city }}, {{ stay.loc.country }}</h1>
      <h3>1000 kilometers away </h3>
      <h2 class>${{ stay.price }} night</h2>
    </div>
    <!--    <button @click="removeStay">X</button>-->
    <!--    <button @click="showDetails">Details</button>-->
    <!--    <router-link :to="{ name: 'stay-edit', params: { id: stay._id } }">Edit</router-link>-->
  </li>
</template>

<script>
// import StayDetails from '@/components/StayDetails.vue'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

export default {
  name: 'StayPreview',
  props: {
    stay: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modules: [Pagination, Navigation],
    }
  },
  methods: {
    removeStay() {
      this.$emit('remove', this.stay._id)
    },
    showDetails() {
      this.$store.dispatch('loadStay', this.stay._id)
    }
  },
  components: {
    // StayDetails,
    Swiper,
    SwiperSlide,
  }
}
</script>