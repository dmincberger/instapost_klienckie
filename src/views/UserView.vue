<script setup>
import User_Picture from '@/components/User_picture.vue'
import User_Photo from '@/components/User_photo.vue'
</script>
<template>
<User_Picture></User_Picture>
<User_Photo v-for="photo in user_photos" :photo="photo"></User_Photo>

</template>

<script>
export default {
    async created(){
        this.email = this.$route.params.email
        let object = {"email":this.email}
        this.user_photos = await this.$store.dispatch("FETCH_USER_PHOTOS_LIST",object)
        if (this.user_photos == "none"){
            this.$router.push("/NotFoundView")
        }
        console.log(this.user_photos);
    },
    data(){
        return {
            email:null,
            user_photos: null
        }
    },
    components:{User_Photo,User_Picture}
}
</script>

<style>

</style>