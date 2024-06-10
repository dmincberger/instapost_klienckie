<script setup>
</script>
<template>
    <div>
        <img :src="image" class="profile_picture">
    </div>
</template>

<script>

 export default {
    name: "ProfilePicture",
    data(){
        return {
            image:null,
            show_edit:null,
            email:null
        }
    },
    async created(){
    //         this.image = await this.$store.dispatch("FETCH_PROFILE_PICTURE")
        this.email = this.$route.params.email
        let object = {"email":this.email}
            this.image = await this.$store.dispatch("FETCH_USER_PROFILE_PICTURE",object)
    }
 }
</script>

<style scoped>
.profile_picture{
    clip-path: circle(50% at 50% 50%);
    width: 100px;
}
</style>