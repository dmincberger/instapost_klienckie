<script setup>
</script>
<template>
        <div>
      <img :src="image_url">
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
    name: "User_photo",
    props: { photo: Object,
     },
     methods:{
     }
  };
</script>

<style scoped>

</style>