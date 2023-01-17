<template>
    <div class="title">
        {{$t('current_language')}}
    </div>
    <div class="main-content">
        Esto es un contenido que dependera del servicio
    </div>
</template>

<script>

    export default {
        data: ()=>({
        }),
        computed: {
            $t() {
                return this.$i18n.t
            }
        },
         
    }
</script>