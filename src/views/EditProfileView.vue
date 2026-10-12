<script setup>
import EditProfilePicture from "@/components/EditProfile_picture.vue";
import Navbar from "@/components/Navbar.vue";
</script>
<template>
  <Navbar></Navbar>
  <div class="page-shell">
    <div id="profile_edit" class="edit-profile">
      <header class="page-header">
        <h1>Edytuj profil</h1>
        <p>Zmień zdjęcie profilowe oraz dane osobowe.</p>
      </header>
      <EditProfilePicture></EditProfilePicture>
    </div>
  </div>
</template>

<script>
export default {
  components: { EditProfilePicture },
};
</script>

<style scoped>
.edit-profile {
  width: min(480px, 100%);
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 2rem 1.75rem;
  box-shadow: var(--shadow-soft);
}

.page-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.page-header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.3rem;
}

.page-header p {
  color: var(--muted);
}
</style>
