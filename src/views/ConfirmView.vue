<template>
<h1>{{confirmation_message}}</h1>
    </template>
    
    
    <script>
    export default {
        data (){
            return {
                confirmation_message: null
            }
        },
        async created(){
            let token = window.location.href.split("=")[1]
            let data = await this.$store.dispatch("CONFIRM_ACCOUNT",token)
            console.log("DATA W VUE: "+JSON.stringify(data));
            this.confirmation_message = data
        },
        methods:{
        }
    }
    </script>
    
    <style scoped>
    </style>