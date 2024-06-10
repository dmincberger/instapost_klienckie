<template>
    <div id="photo area">
        <div id="add_photo">
            <h1>DODAJ ZDJĘCIE</h1>
            <input type="file" id="load_file" @change="load_photo" accept="image/*">
        </div>
        <div id="edit_photo" v-if="current_photo != null">
            <img v-if="current_filter == null" :src="current_photo" id="current_photo">
            <img v-else :src="current_filter_photo" id="current_photo">
            <label for="wyslij">UPLOAD</label>
            <input type="submit" id="wyslij" @click="wyslij">
            <div id="filters">
                <Button @click="apply_filter" id="grayscale">grayscale</Button>
                <Button @click="apply_filter" id="rotate">rotate</Button>
                <Button @click="apply_filter" id="resize">resize</Button>
                <Button @click="apply_filter" id="tint">tint</Button>
                <Button @click="apply_filter" id="flip">flip</Button>
                <Button @click="apply_filter" id="flop">flop</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Photo_add",
    data(){
        return {
            current_photo: null,
            current_filter_photo: null,
            current_filter:null,
            file:null,
            sending_file:null
        }
    },
    methods:{
        load_photo(event){
            let file_input = document.getElementById("load_file")
            let file_reader = new FileReader()
            file_reader.onload = ()=>{
                this.current_photo = file_reader.result
                this.current_filter_photo = this.current_photo
            }
            file_reader.readAsDataURL(event.target.files[0])
            this.file = event.target.files[0]
            console.log(this.file);
        },
        async wyslij(e){
            console.log("sus");
            e.preventDefault();
            if (this.current_filter_photo != null){
            let photo = this.current_filter_photo
            } else {
            let photo = this.current_photo
            }
            let data = new FormData()
            data.append("file",this.file)
            let response = await this.$store.dispatch("POST_PHOTO",data)
            console.log(response);
        },

        async apply_filter(e){
            
            let chosen_filter = e.target.innerHTML
            this.current_filter = chosen_filter
            let data = new FormData()
            data.append("file",this.current_photo)
            console.log("AAAAAAAAAAAAAA");
            console.log(this.current_photo);
            data.append("filter", this.current_filter)
            let response = await this.$store.dispatch("FETCH_FILTERED_PHOTO",data)
            console.log("RESPONSE:? "+response);
            let base64_photo = URL.createObjectURL(response)
            console.log("BBBBBBBBBBBBBBBB");
            console.log(base64_photo + "FWEOKFWKOFE");
            this.current_filter_photo = base64_photo

            this.file = response
            console.log(this.file);
        },

    }
}
</script>

<style>
    #current_photo {
        width:500px;
        height: 700px;
    }
</style>