<script setup>
import Navbar from '@/components/Navbar.vue';
//@ts-ignore
import Profile_Picture from '@/components/Profile_picture.vue';
import Profile_photo from '@/components/Profile_photo.vue';
import Photo_add from '@/components/Photo_add.vue'
</script>
<template>
<Navbar></Navbar>
<div id="profile">
<Profile_Picture></Profile_Picture>
<RouterLink :to="`/EditProfile`">
    Edytuj Profil
</RouterLink>
<h1>ADD PHOTO</h1>
<Photo_add></Photo_add>
</div>
<Profile_photo v-for="photo in photo_list" :photo="photo"></Profile_photo>
</template>

<script>
export default {
    async created(){
        await this.$store.dispatch("FETCH_PROFILE_PHOTOS_LIST")
        let string_photo_list = await this.$store.getters.GET_PROFILE_PHOTO_LIST
        console.log(string_photo_list);
        this.photo_list = string_photo_list
    },
    data(){
        return {
            photo_list: null,
            profile_picture: null
        }
    },
    components:{Profile_Picture, Profile_photo,Photo_add}
}
</script>

<style scoped></style>
