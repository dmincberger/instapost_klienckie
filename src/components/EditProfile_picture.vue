<script setup>
</script>
<template>
  <div class="edit-form">
    <button type="button" class="avatar-btn" @click="choose_profile_picture">
      <img :src="image" class="profile_picture" alt="Zdjęcie profilowe" />
      <span class="avatar-hint">Zmień zdjęcie</span>
    </button>
    <input type="file" id="profile_file" @change="load_photo" />

    <div class="field">
      <label for="name">Imię</label>
      <InputText id="name"></InputText>
    </div>
    <div class="field">
      <label for="lastName">Nazwisko</label>
      <InputText id="lastName"></InputText>
    </div>
    <Button @click="save_changes" label="Zapisz zmiany" class="save-btn" />
  </div>
</template>

<script>
export default {
  name: "EditProfilePicture",
  data() {
    return {
      image: null,
      file: null,
      photo_edit: false,
    };
  },
  async created() {
    this.image = await this.$store.dispatch("FETCH_PROFILE_PICTURE");
  },
  methods: {
    async choose_profile_picture() {
      let profile_file = document.getElementById("profile_file");
      profile_file.click();
    },
    load_photo(event) {
      let file_reader = new FileReader();
      file_reader.onload = () => {
        this.image = file_reader.result;
      };
      file_reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
      console.log(this.file);
      this.info_edit = true;
    },
    async save_changes() {
      if (this.info_edit) {
        let data = new FormData();
        data.append("files", this.file);
        let response = await this.$store.dispatch("CHANGE_PICTURE", data);
        console.log(response);
      }
      let name = document.getElementById("name").value;
      let lastName = document.getElementById("lastName").value;
      let info_object = {};
      if (name.length != 0) {
        info_object["name"] = name;
      }
      if (lastName.length != 0) {
        info_object["lastname"] = lastName;
      }
      if (Object.keys(info_object).length != 0) {
        let response = await this.$store.dispatch("CHANGE_INFO", info_object);
        console.log(response);
      } else {
        console.log("wat");
      }
    },
  },
};
</script>

<style scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.avatar-btn {
  align-self: center;
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-bottom: 1.25rem;
  padding: 0;
}

.profile_picture {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: var(--shadow-soft);
  display: block;
  transition: transform 0.3s var(--ease-out);
}

.avatar-btn:hover .profile_picture {
  transform: scale(1.04);
}

.avatar-hint {
  display: block;
  margin-top: 0.55rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
}

#profile_file {
  display: none;
}

.save-btn {
  width: 100%;
  margin-top: 0.5rem;
}
</style>
