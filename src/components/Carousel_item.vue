<template>
    <div>
      <img :src="image_url">
      <div id="info">
        {{photo.tags}}
      </div>
    </div>
  </template>
  
  <script>
  export default {

        data(){
      return {
      image_url: "http://localhost:3000/api/getimage/"+this.photo.id
      }
    }, 
    name: "CarouselItem",
    props: { photo: Object,
     }
  };
  </script>
  
  <style scoped>
  </style>