<template>
    <div>
      <img :src="this.photo.data">
      <h1>{{ this.photo.tags }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: "CarouselItem",
    props: { photo: Object }
  };
  </script>
  
  <style scoped>
  </style>