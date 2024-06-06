<template>
<div>
<form @submit="login">
<label for="email">email</label><br/>
<InputText type="text" id="email" /><br/>
<label for="password">password</label><br/>
<InputText type="password" id="password" />
<Button type="submit">Log in</Button>

</form>
</div>
<h1 v-if="login_error">
{{error_message}}
</h1>
</template>

<script>
export default {
    data (){
        return{
            test_token: null,
            error_message: null,
            login_error: false
        }
    },
    created(){
        this.test_token = this.$store.getters.GET_AUTH_TOKEN
    },
    methods:{
        async login(e){
            console.log("lglg");
            e.preventDefault();
            
            let login_info = {}
            let email = document.getElementById("email").value
            let password = document.getElementById("password").value
            login_info["email"] = email
            login_info["password"] = password
            console.log("CO WYSYLAM: "+JSON.stringify(login_info));
            let odpowiedz = await this.$store.dispatch("LOGIN_USER",login_info)
            if (odpowiedz["JWT"] != undefined){
            this.test_token = this.$store.getters.GET_AUTH_TOKEN
            this.login_error = false
            this.$router.push("/dashboard")
            } else {
                this.error_message = odpowiedz
                this.login_error = true
            }
        }
    }
}
</script>

<style scoped>

</style>