<script setup>
</script>
<template>
  <div class="avatar-wrap">
    <img :src="image" class="profile_picture" alt="Zdjęcie użytkownika" />
  </div>
</template>

<script>
export default {
  name: "ProfilePicture",
  data() {
    return {
      image: null,
      show_edit: null,
      email: null,
    };
  },
  async created() {
    this.email = this.$route.params.email;
    let object = { email: this.email };
    this.image = await this.$store.dispatch(
      "FETCH_USER_PROFILE_PICTURE",
      object
    );
  },
};
</script>

<style scoped>
.profile_picture {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: var(--shadow-soft);
  background: var(--mist);
}
</style>
