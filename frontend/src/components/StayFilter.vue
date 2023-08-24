// TODO: use props and emit?

<template>
  <!--  <div>-->
  <!--    <el-input type="text"-->
  <!--              v-model="filter.name"-->
  <!--              style="width: 150px"-->
  <!--              @input="debouncedFilter"-->
  <!--              placeholder="Filter by name"-->
  <!--              clearable/>-->
  <!--    <select v-model="filter.inStock" @change="applyFilter">-->
  <!--      <option value="all">All</option>-->
  <!--      <option value="true">In Stock</option>-->
  <!--      <option value="false">Out of Stock</option>-->
  <!--    </select>-->
  <!--    <select v-model="filter.labels" @change="applyFilter" multiple>-->
  <!--      <option v-for="label in labels" :key="label" :value="label">{{ label }}</option>-->
  <!--    </select>-->

  <!--    <el-select-v2-->
  <!--        v-model="filter.labels"-->
  <!--        filterable-->
  <!--        @change="applyFilter"-->
  <!--        :options="labelOptions"-->
  <!--        placeholder="Categories"-->
  <!--        style="width: 150px"-->
  <!--        multiple-->
  <!--    />-->
  <!--    <el-select-v2-->
  <!--        v-model="filter.sortBy"-->
  <!--        :options="optionsSort"-->
  <!--        @change="applyFilter"-->
  <!--        placeholder="Sort by..."-->
  <!--    />-->

  <!--    <select v-model="filter.sortBy" @change="applyFilter">-->
  <!--      <option value="name">Name</option>-->
  <!--      <option value="price">Price</option>-->
  <!--      <option value="created">Created</option>-->
  <!--    </select>-->

  <!--  </div>-->

  <div class="label-header">
    <span class="label-container">
      <img class="label-img" src="../assets/img/label/national-parks.jpg">
      <span class="label-text">National Parks</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/campers.jpg">
      <span class="label-text">Campers</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/shared-homes.jpg">
      <span class="label-text">Rooms</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/amazing-views.jpg">
      <span class="label-text">Amazing Views</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/beach.jpg">
      <span class="label-text">Beach</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/castles.jpg">
      <span class="label-text">Castles</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/islands.jpg">
      <span class="label-text">Islands</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/caves.jpg">
      <span class="label-text">Caves</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/omg.jpg">
      <span class="label-text">OMG!</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/lakefront.jpg">
      <span class="label-text">Lakefront</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/beachfront.jpg">
      <span class="label-text">Beachfront</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/amazing-pools.jpg">
      <span class="label-text">Amazing pools</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/design.jpg">
      <span class="label-text">Design</span>
    </span>

    <span class="label-container">
      <img class="label-img" src="../assets/img/label/cabins.jpg">
      <span class="label-text">Cabins</span>
    </span>

  </div>
</template>

<script>
import {utilService} from '@/services/util.service.js'

export default {
  name: 'StayFilter',

  data() {
    return {
      filter: {
        name: "",
        labels: [],
        sortBy: "name"
      },
      optionsSort:
          [
            {
              value: "name",
              label: "Name"
            },
            {
              value: "price",
              label: "Price"
            },
            {
              value: "created",
              label: "Date added"
            }
          ]
    }
  },
  created() {
    this.$store.dispatch('getLabels')
  },
  methods: {
    applyFilter() {
      this.$emit('filter', this.filter)
    },
    debouncedFilter: utilService.debounce(function () {
      this.applyFilter()
    }, 100)
  },
  computed: {
    labels() {
      return this.$store.state.labels
    },
    labelOptions() {
      return this.labels.map(label => ({
        value: label,
        label: label
      }))
    },
  },
}
</script>