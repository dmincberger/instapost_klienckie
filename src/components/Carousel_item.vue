<template>
  <article class="carousel-card">
    <div class="media">
      <img :src="image_url" alt="Zdjęcie z feedu" />
    </div>
    <div id="info" class="meta">
      {{ photo.tags }}
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      image_url: "http://localhost:3000/api/getimage/" + this.photo.id,
    };
  },
  name: "CarouselItem",
  props: {
    photo: Object,
  },
};
</script>

<style scoped>
.carousel-card {
  width: min(100%, 520px);
  margin: 0 auto;
}

.media {
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--mist);
  aspect-ratio: 4 / 5;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meta {
  padding: 0.9rem 0.2rem 0.2rem;
  color: var(--ink-soft);
  font-size: 0.92rem;
  word-break: break-word;
}
</style>
