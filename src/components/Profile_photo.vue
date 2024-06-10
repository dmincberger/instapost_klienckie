<script setup>
</script>
<template>
        <div>
      <img :src="image_url" @click="edit">
    </div>
</template>

<script>
  export default {
    async created(){
      console.log(this.photo.id);
    },
    data(){
      return {
      image_url: "http://localhost:3000/api/getimage/"+this.photo.id,
      show_edit:null
      }
    }, 
    name: "CarouselItem",
    props: { photo: Object,
     },
     methods:{
      async edit(){
        console.log(this.photo);
        console.log(this.image_url);
        await this.$store.dispatch("SET_EDIT_INFO",this.photo)
        await this.$store.dispatch("SET_EDIT_IMAGE",this.image_url)
        this.$router.push("/edit")
      }
     }
  };
</script>

<style scoped>

</style>