<template>
    <div class="title">
        {{$t("hello")}}
    </div>
    <div class="main-content">
        Esto es un contenido que dependera del servicio
    </div>
</template>

<script>

    export default {
        inject: ['$i18n'],
        computed: {
            $t() {
            return this.$i18n.t
            }
        },
        data: ()=>({
        })  
    }
</script>