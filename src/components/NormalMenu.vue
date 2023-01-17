<template>
    <v-card>
        <v-layout>
        <v-navigation-drawer
            expand-on-hover
            rail
        >
            <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                title="Sandra Adams"
                subtitle="sandra_a88@gmailcom"
            ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item v-for="op in menuOptions"
                    :key="op.id"
                    :prepend-icon="op.icon"
                    :title="titleHandler(op)"
                    @click="op.clickHandler()"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main style="height: 250px">
            <ServiceHandler></ServiceHandler>  
        </v-main>
        </v-layout>
    </v-card>
</template>

<script>
    import ServiceHandler from './ServiceHandler.vue';
    
    export default {
        props:{
            menuOptions:{
                type:Array,
                default:()=>([])
            }
        },
        components:{
            ServiceHandler
        },
        computed:{
            $t() {
                return this.$i18n.t
            }
        },
        methods:{
            toggleLocation(){
                this.$i18n.locale = this.$i18n.locale =="en"? "es":"en";
            },
            titleHandler(op){
                return typeof op.title == 'function'?op.title():op.title
            }
        },
    }
</script>

<style>
    .theme-icon{
        font-size: 1.5rem;
    }
</style>