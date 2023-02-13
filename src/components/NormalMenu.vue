<template>
    <v-card>
        <v-layout>
        <v-navigation-drawer
            id="navBarMenu"
            v-model="drawer"
            :rail="rail"
            permanent
            @click.stop="railHandler"
            @mouseenter="railHandler"
        >
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
                title="John Leider"
                nav
                >
                <template v-slot:append>
                    <v-btn
                    variant="text"
                    icon="mdi-chevron-left"
                    @click.stop="rail = !rail"
                    ></v-btn>
                </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <div v-for="op in menuOptions" :key="op.id">
                    <div v-if="op.childServices">
                        <v-menu location="end">
                            <template 
                                v-slot:activator="{ props }"
                            >
                                <v-list-item
                                    v-bind="props"
                                    :prepend-icon="op.icon"
                                    :title="titleHandler(op)"
                                ></v-list-item>
                            </template>
                            <v-list>
                                <div
                                    v-for="(ops, index) in op.childServices" :key="index"
                                >
                                    <v-list-item 
                                        
                                        v-if="ops.id != 1"
                                    >
                                    <v-list-item-title  
                                        class="dropdown-item"
                                        @click="makeClick(ops)"
                                    >{{$t(ops.title)}}</v-list-item-title>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </v-menu>
                    </div>
                   
                    <v-list-item v-else
                        :prepend-icon="op.icon"
                        :title="titleHandler(op)"
                        @click="makeClick(op)"
                    >
                    </v-list-item>
                </div>
                
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <ServiceHandler
                :current-service="currentService"
            ></ServiceHandler>  
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
            },
            currentService:{
                type:Array
            },
            selectService:{
                type:Function
            },
        },
        data(){
            return{
                rail:true,
                drawer:true
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
        mounted(){
            document.addEventListener('click', (e)=>{
                if(!document.getElementById('navBarMenu').contains(e.target)){
                    this.rail = true;
                }
            });
            
        },
        methods:{
            toggleLocation(){
                this.$i18n.locale = this.$i18n.locale =="en"? "es":"en";
            },
            titleHandler(op){
                return typeof op.title == 'function'?op.title():op.title
            },
            railHandler(){
                this.rail =!this.rail;
                this.rail = false
            },
            makeClick(op){
                this.rail = true;
                op.clickHandler();
            }
        },
    }
</script>

<style>
    .theme-icon{
        font-size: 1.5rem;
    }
    .dropdown-item{
        cursor: pointer;
    }
</style>