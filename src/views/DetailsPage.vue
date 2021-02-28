<template>
<div>
    <crypto-loader v-if="isLoading"></crypto-loader>
    Details Page
</div>
</template>

<script>


import axios from "axios";
import CryptoLoader from '../components/CryptoLoader';

export default {
    mounted() {},

    created() {
        const cryptoId = this.$route.params.id;
        this.isLoading = true;
        axios
            .get('http://localhost:5000/cryptocurrency/quotes/latest?id=' + cryptoId)
            .then(response => {
                console.log(response.data.data[cryptoId]);
                this.isLoading = false;
            })
            .catch(error => {
                this.isLoading = false;
                console.log(error);
            }); 
    },

    data() {
        return {
            isLoading: false
        };
    },
    components: {
        CryptoLoader,
    },
};
</script>

<style lang="scss">
</style>
