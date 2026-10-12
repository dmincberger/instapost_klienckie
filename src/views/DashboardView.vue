<script setup>
import CarouselItem from "@/components/Carousel_item.vue";
import Navbar from "@/components/Navbar.vue";
</script>
<template>
  <Navbar></Navbar>
  <div class="page-shell dashboard">
    <header class="page-header">
      <h1>Twój feed</h1>
      <p>Przeglądaj zdjęcia społeczności Instapost.</p>
    </header>
    <div class="feed-stage">
      <Carousel :value="photo_list" :numVisible="1" :numScroll="1">
        <template #item="photo">
          <CarouselItem :photo="photo.data"></CarouselItem>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo_list: null,
    };
  },
  async created() {
    await this.$store.dispatch("FETCH_PHOTOS_LIST");
    let string_photo_list = JSON.stringify(this.$store.getters.GET_PHOTO_LIST);
    this.photo_list = JSON.parse(string_photo_list);
    console.log(this.photo_list);
  },

  components: { CarouselItem },
};
</script>

<style scoped>
.dashboard {
  max-width: 720px;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 0.35rem;
}

.page-header p {
  color: var(--muted);
}

.feed-stage {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 1rem 0.5rem 1.25rem;
  box-shadow: var(--shadow-soft);
  animation: fade-up 0.6s var(--ease-out) 0.08s both;
}
</style>
