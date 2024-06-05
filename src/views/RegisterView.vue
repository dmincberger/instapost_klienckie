<template>
<div class="form_div">
<form @submit="register">
<label for="name">Name</label><br>
<InputText type="text" id="name" />
<label for="lastName">lastName</label>
<InputText type="text" id="lastName" />
<label for="email">email</label>
<InputText type="text" id="email" />
<label for="password">password</label>
<InputText type="password" id="password" />
<Button type="submit">Register</Button>
</form>
</div>
<h1 v-if="register_state">{{register_message}}</h1>
<h1 v-else>{{confirmation_error}}</h1>
</template>


<script>
export default {
    data (){
        return {
      register_message: "Na maila został wysłany link aktywacyjny. Uwaga!: jest ważny jedynie przez godzinę",
      register_state: null,
      confirmation_error: null
        }
    },
    methods:{
        async register(e){
            console.log("lglg");
            e.preventDefault();
            
            let register_info = {}
            let email = document.getElementById("email").value
            let name = document.getElementById("name").value
            let lastName = document.getElementById("lastName").value
            let password = document.getElementById("password").value
            register_info["email"] = email
            register_info["name"] = name
            register_info["lastName"] = lastName
            register_info["password"] = password
            let odpowiedz = await this.$store.dispatch("REGISTER_USER",register_info)
            if (odpowiedz.match(/\/confirm\?token=([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/)){
                console.log("ZMATCHOWALO");
                this.register_state = true
            } else {
                this.confirmation_error = odpowiedz
            }

        },
    }
}
</script>

<style scoped>
</style>