<template>

</template>

<script>
export default{
    async created(){
        console.log("co");
    await this.$store.dispatch("LOGOUT_USER")
    console.log("co2");
    this.$router.push("/")
    }
}
</script>

<style></style>