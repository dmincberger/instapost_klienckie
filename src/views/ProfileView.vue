<script setup>
import Navbar from "@/components/Navbar.vue";
//@ts-ignore
import Profile_Picture from "@/components/Profile_picture.vue";
import Profile_photo from "@/components/Profile_photo.vue";
import Photo_add from "@/components/Photo_add.vue";
</script>
<template>
  <Navbar></Navbar>
  <div class="page-shell profile-page">
    <section class="profile-hero" id="profile">
      <Profile_Picture></Profile_Picture>
      <div class="profile-meta">
        <h1>Twój profil</h1>
        <p>Zarządzaj zdjęciami i wyglądem profilu.</p>
        <RouterLink class="edit-link" :to="`/EditProfile`">
          Edytuj profil
        </RouterLink>
      </div>
    </section>

    <section class="upload-section">
      <Photo_add></Photo_add>
    </section>

    <section class="gallery-section">
      <h2>Twoje zdjęcia</h2>
      <div class="photo-grid">
        <Profile_photo
          v-for="photo in photo_list"
          :key="photo.id"
          :photo="photo"
        ></Profile_photo>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("FETCH_PROFILE_PHOTOS_LIST");
    let string_photo_list = await this.$store.getters.GET_PROFILE_PHOTO_LIST;
    console.log(string_photo_list);
    this.photo_list = string_photo_list;
  },
  data() {
    return {
      photo_list: null,
      profile_picture: null,
    };
  },
  components: { Profile_Picture, Profile_photo, Photo_add },
};
</script>

<style scoped>
.profile-hero {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
}

.profile-meta h1 {
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}

.profile-meta p {
  color: var(--muted);
  margin-bottom: 0.85rem;
}

.edit-link {
  display: inline-flex;
  font-weight: 600;
  color: var(--accent);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s var(--ease-out);
}

.edit-link:hover {
  border-color: var(--accent);
}

.upload-section {
  margin-bottom: 2.5rem;
}

.gallery-section h2 {
  font-size: 1.35rem;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .profile-hero {
    flex-direction: column;
    text-align: center;
  }
}
</style>
