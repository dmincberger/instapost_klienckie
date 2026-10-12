<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
<template>
  <Navbar></Navbar>
  <div class="page-shell">
    <div id="edit_area" class="edit-layout" v-if="photo_info && photo_image">
      <div class="preview">
        <img
          v-if="current_filter_photo == null"
          :src="photo_image"
          alt="Edytowane zdjęcie"
        />
        <img v-else :src="current_filter_photo" alt="Edytowane zdjęcie" />
      </div>

      <aside class="side-panel">
        <h1>Edycja zdjęcia</h1>
        <p class="hint">Kliknij tag, żeby usunąć. Enter dodaje nowy.</p>

        <div id="photo_tags" class="tags">
          <Tag
            v-for="(tag, i) in this.all_tags"
            :key="i"
            @click="remove_tag(i)"
            >#{{ tag.name }}</Tag
          >
          <InputText id="tag_input" placeholder="Nowy tag…" @keydown="add_tag"></InputText>
        </div>

        <h2 class="section-label">Filtry</h2>
        <div id="filters" class="filters">
          <Button @click="apply_filter" id="grayscale">grayscale</Button>
          <Button @click="apply_filter" id="rotate">rotate</Button>
          <Button @click="apply_filter" id="resize">resize</Button>
          <Button @click="apply_filter" id="tint">tint</Button>
          <Button @click="apply_filter" id="flip">flip</Button>
          <Button @click="apply_filter" id="flop">flop</Button>
        </div>

        <Button id="Save" class="save-btn" @click="Save_edit">Zapisz zmiany</Button>
      </aside>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      photo_info: null,
      photo_image: null,
      added_tags: [],
      all_tags: null,
      current_filter_photo: null,
      current_photo: null,
      current_filter: null,
      file: null,
      edited: false,
    };
  },
  async created() {
    this.photo_info = await this.$store.getters.GET_PHOTO_EDIT_INFO;
    this.photo_image = await this.$store.getters.GET_PHOTO_EDIT_IMAGE;
    this.all_tags = this.photo_info.tags;
    await this.loadImageAsBase64(this.photo_image);
  },
  name: "EditPhoto",
  props: {
    photo: Object,
    photo_url: String,
  },
  methods: {
    add_tag(e) {
      if (e.key == "Enter") {
        let tag = document.getElementById("tag_input").value;
        let found_tags = this.all_tags.filter(
          (element) => element["name"] == tag
        );
        if (found_tags.length == 0 && tag.length != 0) {
          document.getElementById("tag_input").value = "";
          this.added_tags.push({ name: tag });
          console.log(this.added_tags);
          this.all_tags.push({ name: tag });
        }
      }
    },
    remove_tag(index) {
      let deleted_tag = this.all_tags[index];
      this.all_tags.splice(index, 1);
      let added_index = this.added_tags.indexOf(deleted_tag);
      this.added_tags.splice(index, 1);
    },
    async Save_edit(e) {
      let id = this.photo_info.id;
      let tags = { tags: this.all_tags };
      let parsed_tags = JSON.stringify(tags);
      console.log(parsed_tags);
      let object = {
        id: id,
        tags: tags,
      };
      let response_1 = await this.$store.dispatch("UPDATE_TAG", object);
      console.log(response_1);
      console.log("sus");
      e.preventDefault();
      let photo = this.current_photo;
      if (this.current_filter_photo != null) {
        photo = this.current_filter_photo;
      }
      if (this.edited == true) {
        let data = new FormData();
        let file_sent = this.current_photo;
        console.log("START");
        console.log(file_sent);
        data.append("file", file_sent);
        data.append("filter", this.current_filter);
        let object_data = { id: this.photo_info.id, photo_data: data };
        let response = await this.$store.dispatch("PATCH_PHOTO", object_data);
        console.log(response);
        this.$router.push("/profile");
      }
    },
    async apply_filter(e) {
      this.edited = true;
      let chosen_filter = e.target.innerHTML;
      this.current_filter = chosen_filter;
      let data = new FormData();
      data.append("file", this.current_photo);
      data.append("filter", this.current_filter);
      let response = await this.$store.dispatch("FETCH_FILTERED_PHOTO", data);
      this.current_filter_photo = URL.createObjectURL(response);
      this.file = response;
      console.log(this.file);
    },
    async loadImageAsBase64(imageUrl) {
      const response = await this.$store.dispatch("FETCH_PHOTO_BLOB", imageUrl);
      console.log(response);
      this.current_photo = response;
    },
  },
};
</script>

<style scoped>
.edit-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.5rem;
  align-items: start;
}

.preview {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
  min-height: 360px;
}

.preview img {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
}

.side-panel {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-soft);
}

.side-panel h1 {
  font-size: 1.6rem;
  margin-bottom: 0.35rem;
}

.hint {
  color: var(--muted);
  font-size: 0.92rem;
  margin-bottom: 1.1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

#tag_input {
  width: 100%;
  margin-top: 0.5rem;
}

.section-label {
  font-size: 1rem;
  margin-bottom: 0.65rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
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
  transform: none;
}

.save-btn {
  width: 100%;
}

@media (max-width: 860px) {
  .edit-layout {
    grid-template-columns: 1fr;
  }
}
</style>
