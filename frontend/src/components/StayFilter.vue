<template>
  <div>
    <el-input type="text"
              v-model="filter.name"
              style="width: 150px"
              @input="debouncedFilter"
              placeholder="Filter by name"
              clearable/>
    <!--    <select v-model="filter.inStock" @change="applyFilter">-->
    <!--      <option value="all">All</option>-->
    <!--      <option value="true">In Stock</option>-->
    <!--      <option value="false">Out of Stock</option>-->
    <!--    </select>-->
    <!--    <select v-model="filter.labels" @change="applyFilter" multiple>-->
    <!--      <option v-for="label in labels" :key="label" :value="label">{{ label }}</option>-->
    <!--    </select>-->

    <el-select-v2
        v-model="filter.labels"
        filterable
        @change="applyFilter"
        :options="labelOptions"
        placeholder="Categories"
        style="width: 150px"
        multiple
    />
    <el-select-v2
        v-model="filter.sortBy"
        :options="optionsSort"
        @change="applyFilter"
        placeholder="Sort by..."
    />

    <!--    <select v-model="filter.sortBy" @change="applyFilter">-->
    <!--      <option value="name">Name</option>-->
    <!--      <option value="price">Price</option>-->
    <!--      <option value="created">Created</option>-->
    <!--    </select>-->

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