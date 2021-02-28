<template>
<div>
    <crypto-loader v-if="isLoading"></crypto-loader>
    Details Page
    {{cryptoCurrency.name}} {{cryptoCurrency.id}} {{cryptoCurrency.market_cap}}
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
                //console.log(response.data.data[cryptoId]);
                const cryptoFromApi = response.data.data[cryptoId];

                this.cryptoCurrency.id = cryptoFromApi.id;
                this.cryptoCurrency.name = cryptoFromApi.name;
                this.cryptoCurrency.market_cap = cryptoFromApi.quote.USD.market_cap;


                this.isLoading = false;
            })
            .catch(error => {
                this.isLoading = false;
                console.log(error);
            }); 
    },

    data() {
        return {
            isLoading: false,
            cryptoCurrency: {
                id: '',
                name:'',
                cmc_rank: '',
                market_cap: ''
            }
        };
    },
    components: {
        CryptoLoader,
    },
};
</script>

<style lang="scss">
</style>
