
<template>
<RouterLink
        v-for="car in carsList"
        :to="`/car/${car.car_id}`"
        :key="car.id"
      >
        <TestTile v-bind:car="car" />
</RouterLink>
</template>

<script>
import TestTile from "@/components/Test_tile.vue"
export default  {
  created() {
    this.$store.dispatch("FETCH_TEST")
},
  computed: {
    carsList() {
      return this.$store.getters.GET_TEST_LIST;
    }
},
components: {TestTile}
}
</script>