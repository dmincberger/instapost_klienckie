<script setup>
import CarouselItem from "@/components/Carousel_item.vue"
import Navbar from "@/components/Navbar.vue";
</script>
<template>
    <Navbar></Navbar>
    <Carousel :value="photo_list" :numVisible="1" :numScroll="1">
        <template #item="photo">
      <CarouselItem :photo="photo.data"></CarouselItem>
    </template>
    </Carousel>
  </template>

<script>
export default {
    data(){
        return{
        photo_list: null
        }
    },
    async created(){
        await this.$store.dispatch("FETCH_PHOTOS_LIST")
        let string_photo_list = JSON.stringify(this.$store.getters.GET_PHOTO_LIST)
        this.photo_list = JSON.parse(string_photo_list)
        console.log(this.photo_list);
    },

    components:{CarouselItem}
}
</script>

<style scoped>

</style>