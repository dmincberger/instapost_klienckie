<script setup>
</script>
<template>
    <div>
        <img :src="image" class="profile_picture">
    </div>
</template>

<script>

 export default {
    name: "EditProfilePicture",
    data(){
        return {
            image:null,
        }
    },
    async created(){
            this.image = await this.$store.dispatch("FETCH_PROFILE_PICTURE")
    }
 }
</script>

<style scoped>
.profile_picture{
    clip-path: circle(50% at 50% 50%);
    width: 100px;
}
</style>