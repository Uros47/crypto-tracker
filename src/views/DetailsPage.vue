<template>
<div>Details Page</div>
</template>

<script>


import axios from "axios";

export default {
    mounted() {},

    created() {

    const cryptoId = this.$route.params.id;

    axios.get('http://localhost:5000/cryptocurrency/quotes/latest?id=' + cryptoId).then(response=>{console.error(response)}) 
    },

    data() {
        return {};
    },
};
</script>

<style lang="scss">
</style>
