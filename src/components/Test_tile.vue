<template>
    <div :style="test_Style">
      <h3>{{ this.car.car_name }}</h3>
      <h3>{{ this.car.car_type }}</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: "TestTile",
    props: { car: Object },
    computed: {
      test_Style() {
       
        return {
          background: `blue`,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  </style>