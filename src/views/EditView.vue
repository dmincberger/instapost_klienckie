<template>
    <div id="edit_area" v-if="photo_info && photo_image">
        <img v-if="current_filter_photo == null" :src="photo_image">
        <img v-else :src="current_filter_photo">
        <div id="photo_tags">
            <Tag v-for="(tag,i) in this.all_tags" @click="remove_tag(i)">#{{tag.name}}

            </Tag>
            <br>
    <InputText id="tag_input" @keydown="add_tag"></InputText>
    </div>
    <div id="filters">
        <Button @click="apply_filter" id="grayscale">grayscale</Button>
                <Button @click="apply_filter" id="rotate">rotate</Button>
                <Button @click="apply_filter" id="resize">resize</Button>
                <Button @click="apply_filter" id="tint">tint</Button>
                <Button @click="apply_filter" id="flip">flip</Button>
                <Button @click="apply_filter" id="flop">flop</Button>
    </div>
    <Button id="Save" @click="Save_edit">Save_edit</Button>
    </div>
    </template>
    <script>
    export default {
        data(){
            return{
                photo_info:null,
                photo_image:null,
                added_tags: [],
                all_tags: null,
                current_filter_photo: null,
                current_photo: null,
                current_filter:null,
                file:null,
                edited:false
            }
        },
        async created(){
            this.photo_info = await this.$store.getters.GET_PHOTO_EDIT_INFO
            this.photo_image = await this.$store.getters.GET_PHOTO_EDIT_IMAGE
            this.all_tags = this.photo_info.tags
            await this.loadImageAsBase64(this.photo_image)
        },
        name: "EditPhoto",
        props:{
            photo: Object,
            photo_url: String
        },
        methods:{
            add_tag(e){
                if (e.key == "Enter"){
                    let tag = document.getElementById("tag_input").value
                    let found_tags = this.all_tags.filter((element) => element["name"] == tag)
                    if (found_tags.length == 0 && tag.length != 0){
                    document.getElementById("tag_input").value = ""
                                           this.added_tags.push({name: tag})
                                           console.log(this.added_tags);
                    this.all_tags.push({name:tag}) 
                    }

                }
            },
            remove_tag(index){
                let deleted_tag = this.all_tags[index]
                this.all_tags.splice(index,1)
                let added_index = this.added_tags.indexOf(deleted_tag)
                this.added_tags.splice(index,1)
            },
            async Save_edit(e){
                let id = this.photo_info.id
                let tags = {"tags":this.all_tags}
                let parsed_tags =JSON.stringify(tags)
                console.log(parsed_tags);
                let object = {
                    id:id,
                    tags:tags
                }
                let response_1 = await this.$store.dispatch("UPDATE_TAG",object)
                console.log(response_1);
                console.log("sus");
            e.preventDefault();
            let photo = this.current_photo
            if (this.current_filter_photo != null){
            photo = this.current_filter_photo
            }
            if (this.edited == true){
            let data = new FormData()
            let file_sent = this.current_photo
            console.log("START");
            console.log(file_sent);
            data.append("file",file_sent)
            data.append("filter",this.current_filter)
            let object_data = {"id":this.photo_info.id,"photo_data":data}
            let response = await this.$store.dispatch("PATCH_PHOTO",object_data)
            console.log(response);
            this.$router.push("/profile")
            }
            },
            async apply_filter(e){
                this.edited = true
            let chosen_filter = e.target.innerHTML
            this.current_filter = chosen_filter
            let data = new FormData()
            data.append("file",this.current_photo)
            data.append("filter", this.current_filter)
            let response = await this.$store.dispatch("FETCH_FILTERED_PHOTO",data)
            this.current_filter_photo = URL.createObjectURL(response)
            this.file = response
            console.log(this.file);
        },
        async loadImageAsBase64(imageUrl) {
            const response = await this.$store.dispatch("FETCH_PHOTO_BLOB",imageUrl)
            console.log(response);
            this.current_photo = response
        },
        }
    }
    </script>
    
    <style scoped>
    #edit_area{
        display: flex;
        flex-direction: row;
    }
    #tag_input {
        height: 30px;
    }
    #Save{
        position: relative;
        height: 50px;
    }
    </style>