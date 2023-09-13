<template>
  <section class="label-grid-container">
    <div class="label-container-main">
      <button @click="scrollLeft" v-if="showLeft" class="scroll-button scroll-left">
        <svg class="scroll-svg-element" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false">
          <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"/>
        </svg>
      </button>

      <div ref="scrollContainer" class="label-header">
        <div class="label-container"
             v-for="(label, index) in labels"
             :key="index">
          <img
              class="label-img"
              :src="label.img">
          <span class="label-text">{{ label.text }}</span>
        </div>
      </div>
      <button @click="scrollRight" v-if="showRight" class="scroll-button scroll-right ">
        <svg class="scroll-svg-element" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false">
          <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"/>
        </svg>
      </button>
    </div>

    <!--    <button class="filters-button"> Filters </button>-->
  </section>
</template>
<script>
export default {
  name: 'StayLabels',
  data() {
    return {
      labels: [
        {
          img: 'src/assets/img/label/national-parks.jpg',
          text: 'National Parks'
        },
        {
          img: 'src/assets/img/label/campers.jpg',
          text: 'Campers'
        },
        {
          img: 'src/assets/img/label/shared-homes.jpg',
          text: 'Rooms'
        },
        {
          img: 'src/assets/img/label/amazing-views.jpg',
          text: 'Amazing Views'
        },
        {
          img: 'src/assets/img/label/beach.jpg',
          text: 'Beach'
        },
        {
          img: 'src/assets/img/label/castles.jpg',
          text: 'Castles'
        },
        {
          img: 'src/assets/img/label/islands.jpg',
          text: 'Islands'
        },
        {
          img: 'src/assets/img/label/caves.jpg',
          text: 'Caves'
        },
        {
          img: 'src/assets/img/label/omg.jpg',
          text: 'OMG!'
        },
        {
          img: 'src/assets/img/label/lakefront.jpg',
          text: 'Lakefront'
        },
        {
          img: 'src/assets/img/label/beachfront.jpg',
          text: 'Beachfront'
        },
        {
          img: 'src/assets/img/label/amazing-pools.jpg',
          text: 'Amazing pools'
        },
        {
          img: 'src/assets/img/label/design.jpg',
          text: 'Design'
        },
        {
          img: 'src/assets/img/label/cabins.jpg',
          text: 'Cabins'
        },
      ],
      showLeft: false,
      showRight: false,
    }
  },

  mounted() {
    this.stickyPoint = this.$el.offsetTop
    window.addEventListener('scroll', this.handleScroll)
    this.$refs.scrollContainer.addEventListener('scroll', this.checkScroll)
    this.checkScroll()
  },

  updated() {
    this.checkScroll()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    this.$refs.scrollContainer.removeEventListener('scroll', this.checkScroll)
  },

  methods: {
    scrollLeft() {
      this.$refs.scrollContainer.scrollBy({top: 0, left: -300, behavior: 'smooth'})
      this.checkScroll()
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollBy({top: 0, left: 300, behavior: 'smooth'})
      this.checkScroll()
    },
    checkScroll() {
      const { scrollLeft, scrollWidth, clientWidth } = this.$refs.scrollContainer
      this.showLeft = scrollLeft > 0
      this.showRight = scrollLeft < scrollWidth - clientWidth - 200
    },
    handleScroll() {
      this.isSticky = window.pageYOffset > this.stickyPoint
    }
  }
}
</script>
