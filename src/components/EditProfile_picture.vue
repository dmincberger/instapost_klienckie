<script setup>
</script>
<template>
    <div>
        <img :src="image" class="profile_picture" @click="choose_profile_picture">
        <input type="file" id="profile_file" @change="load_photo">
        <label for="name">name</label>
        <InputText id="name"></InputText>
        <label for="lastName">lastName</label>
        <InputText id="lastName"></InputText>
        <Button @click="save_changes">Save changes</Button>
    </div>
</template>

<script>

 export default {
    name: "EditProfilePicture",
    data(){
        return {
            image:null,
            file:null,
            photo_edit:false,
        }
    },
    async created(){
            this.image = await this.$store.dispatch("FETCH_PROFILE_PICTURE")
    },
    methods:{
        async choose_profile_picture(){
            let profile_file = document.getElementById("profile_file")
            profile_file.click()
        },
        load_photo(event){
            let file_reader = new FileReader()
            file_reader.onload = ()=>{
                this.image = file_reader.result
            }
            file_reader.readAsDataURL(event.target.files[0])
            this.file = event.target.files[0]
            console.log(this.file);
            this.info_edit = true
        },
        async save_changes(){
            if(this.info_edit){
            let data = new FormData()
            data.append("files",this.file)
            let response = await this.$store.dispatch("CHANGE_PICTURE",data)
                console.log(response);
            }
            let name = document.getElementById("name").value
            let lastName = document.getElementById("lastName").value
            let info_object = {}
            if (name.length != 0){
                info_object["name"] = name
            }
            if (lastName.length != 0){
                info_object["lastname"] = lastName
            }
            if (Object.keys(info_object).length != 0){
                let response = await this.$store.dispatch("CHANGE_INFO",info_object)
                console.log(response);
            } else {
                console.log("wat");
            }
        }
    }
 }
</script>

<style scoped>
.profile_picture{
    clip-path: circle(50% at 50% 50%);
    width: 100px;
}
#profile_file{
    display: none
}
</style>