<script setup>
</script>
<template>
  <div class="avatar-wrap">
    <img :src="image" class="profile_picture" alt="Zdjęcie profilowe" />
  </div>
</template>

<script>
export default {
  name: "EditProfilePicture",
  data() {
    return {
      image: null,
    };
  },
  async created() {
    this.image = await this.$store.dispatch("FETCH_PROFILE_PICTURE");
  },
};
</script>

<style scoped>
.avatar-wrap {
  flex-shrink: 0;
}

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
