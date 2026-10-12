<template>
  <div id="photo area" class="uploader">
    <div id="add_photo" class="uploader-head">
      <div>
        <h2>Dodaj zdjęcie</h2>
        <p>Wybierz plik, zastosuj filtr i wyślij na profil.</p>
      </div>
      <label class="file-btn" for="load_file">
        Wybierz plik
        <input type="file" id="load_file" @change="load_photo" accept="image/*" />
      </label>
    </div>

    <div id="edit_photo" class="editor" v-if="current_photo != null">
      <div class="preview">
        <img
          v-if="current_filter == null"
          :src="current_photo"
          id="current_photo"
          alt="Podgląd"
        />
        <img
          v-else
          :src="current_filter_photo"
          id="current_photo"
          alt="Podgląd z filtrem"
        />
      </div>

      <div class="editor-side">
        <div id="filters" class="filters">
          <Button @click="apply_filter" id="grayscale">grayscale</Button>
          <Button @click="apply_filter" id="rotate">rotate</Button>
          <Button @click="apply_filter" id="resize">resize</Button>
          <Button @click="apply_filter" id="tint">tint</Button>
          <Button @click="apply_filter" id="flip">flip</Button>
          <Button @click="apply_filter" id="flop">flop</Button>
        </div>
        <label for="wyslij" class="upload-label">
          Wyślij zdjęcie
          <input type="submit" id="wyslij" @click="wyslij" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Photo_add",
  data() {
    return {
      current_photo: null,
      current_filter_photo: null,
      current_filter: null,
      file: null,
      sending_file: null,
    };
  },
  methods: {
    load_photo(event) {
      let file_input = document.getElementById("load_file");
      let file_reader = new FileReader();
      file_reader.onload = () => {
        this.current_photo = file_reader.result;
        this.current_filter_photo = this.current_photo;
      };
      file_reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
      console.log(this.file);
    },
    async wyslij(e) {
      console.log("sus");
      e.preventDefault();
      if (this.current_filter_photo != null) {
        let photo = this.current_filter_photo;
      } else {
        let photo = this.current_photo;
      }
      let data = new FormData();
      data.append("file", this.file);
      let response = await this.$store.dispatch("POST_PHOTO", data);
      console.log(response);
    },

    async apply_filter(e) {
      let chosen_filter = e.target.innerHTML;
      this.current_filter = chosen_filter;
      let data = new FormData();
      data.append("file", this.current_photo);
      console.log("AAAAAAAAAAAAAA");
      console.log(this.current_photo);
      data.append("filter", this.current_filter);
      let response = await this.$store.dispatch("FETCH_FILTERED_PHOTO", data);
      console.log("RESPONSE:? " + response);
      let base64_photo = URL.createObjectURL(response);
      console.log("BBBBBBBBBBBBBBBB");
      console.log(base64_photo + "FWEOKFWKOFE");
      this.current_filter_photo = base64_photo;

      this.file = response;
      console.log(this.file);
    },
  },
};
</script>

<style scoped>
.uploader {
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-soft);
}

.uploader-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.uploader-head h2 {
  font-size: 1.35rem;
  margin-bottom: 0.25rem;
}

.uploader-head p {
  color: var(--muted);
  font-size: 0.95rem;
}

.file-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.15rem;
  border-radius: var(--radius-sm);
  background: var(--ink);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s var(--ease-out), background 0.2s var(--ease-out);
}

.file-btn:hover {
  background: var(--ink-soft);
  transform: translateY(-1px);
}

.file-btn input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.editor {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.preview {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--mist);
  min-height: 280px;
}

#current_photo {
  width: 100%;
  height: auto;
  max-height: 520px;
  object-fit: contain;
  margin: 0 auto;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filters :deep(.p-button) {
  background: var(--paper) !important;
  color: var(--ink) !important;
  border: 1px solid var(--line) !important;
  font-size: 0.85rem !important;
  padding: 0.5rem 0.8rem !important;
}

.filters :deep(.p-button:hover) {
  background: var(--accent-soft) !important;
  color: var(--accent-deep) !important;
  border-color: transparent !important;
  transform: none;
}

.upload-label {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s var(--ease-out);
}

.upload-label:hover {
  background: var(--accent-deep);
}

.upload-label input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

@media (max-width: 760px) {
  .editor {
    grid-template-columns: 1fr;
  }
}
</style>
