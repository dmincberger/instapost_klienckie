 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"></link>
<template>
<MenuBar :model="items" style="display:flex;flex-direction: row">
<template #item="menu_button">
    <a href="#" @click.prevent="change_view(menu_button.item.url)"><h5>{{ menu_button.item.name }}</h5></a>
    <span :class="menu_button.item.icon"></span>
</template>
</MenuBar>
</template>

<script>
export default{
    name: "Navbar",
    data(){
        return{
            items:[{
                icon: 'pi pi-user',
                name: 'profile',
                url: '/profile'
            },
            {
                icon: 'pi pi-home',
                name: 'dashboard',
                url: '/dashboard'
            },
            {
                icon: 'pi pi-sign-out',
                name: 'logout',
                url: '/logout'
            },
        ]
        }
    },
    methods:{
        change_view(url){
            this.$router.push(url)
        }
    }
}
</script>

<style>

</style>