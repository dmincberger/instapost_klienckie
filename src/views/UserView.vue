<script setup>
import User_Picture from "@/components/User_picture.vue";
import User_Photo from "@/components/User_photo.vue";
</script>
<template>
  <div class="page-shell user-page">
    <section class="user-hero">
      <User_Picture></User_Picture>
      <div class="user-meta">
        <h1>{{ email }}</h1>
        <p>Publiczna galeria użytkownika</p>
      </div>
    </section>

    <div class="photo-grid">
      <User_Photo
        v-for="photo in user_photos"
        :key="photo.id"
        :photo="photo"
      ></User_Photo>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    this.email = this.$route.params.email;
    let object = { email: this.email };
    this.user_photos = await this.$store.dispatch(
      "FETCH_USER_PHOTOS_LIST",
      object
    );
    if (this.user_photos == "none") {
      this.$router.push("/NotFoundView");
    }
    console.log(this.user_photos);
  },
  data() {
    return {
      email: null,
      user_photos: null,
    };
  },
  components: { User_Photo, User_Picture },
};
</script>

<style scoped>
.user-hero {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
}

.user-meta h1 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  word-break: break-all;
}

.user-meta p {
  color: var(--muted);
}

@media (max-width: 640px) {
  .user-hero {
    flex-direction: column;
    text-align: center;
  }
}
</style>
