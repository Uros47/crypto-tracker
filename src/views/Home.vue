<template>
<div id="app ">
    <div class="d-flex justify-content-center mt-5 p-5">
        <crypto-table :coins="coins"></crypto-table>
        <crypto-loader v-if="isLoading"></crypto-loader>
    </div>

    <router-view />
</div>
</template>

<style lang="scss">

</style>
<script>
import axios from "axios";
import CryptoTable from '../components/CryptoTable';
import CryptoLoader from '../components/CryptoLoader';

export default {
    data() {
        return {
            coins: [],
            isLoading: false

        };
    },

    mixins: [],

    computed: {},

    created() {

    },

    mounted() {
        // 1) show loader
        // 2) call fn that retrieves data from coinmarketcap, and fills table
        // 3) setInterval on 60sec that calls fn from step 2.
        /*
            posto coinmarketcap zabranjuje pozive ka svom apiju iz clientskih aplikacija, morao sam da pokrenem dummy proxy server (node.js)
            koji samo prosledjuje pozive ka cmc. Server sam preuzeo sa https://github.com/theBliz/cmc-proxy. Na serveru je samo potrebno da
            se unese svoj api key.
        */
        this.isLoading = true;
        this.getCrypto(true);
        

        setInterval(this.getCrypto, 60000);
    },

    methods: {
        getCrypto(setLoader = false) {
            this.isLoading = setLoader;
            axios
                .get('http://localhost:5000/cryptocurrency/listings/latest?limit=50')
                .then(response => {
                    this.coins = response.data.data.map(x => {
                        return {
                            id: x.id,
                            name: x.name,
                            symbol: x.symbol,
                            price: x.quote.USD.price,
                            percentChange: x.quote.USD.percent_change_24h,
                            coinsOwned: this.getCoinsOwned(x.symbol),
                            inputedCoins: this.getCoinsOwned(x.symbol) == 0 ? "" : this.getCoinsOwned(x.symbol)
                        }
                    });

                    this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
                    console.log(error);
                });
        },

        getCoinsOwned(symbol){
            let amount = localStorage.getItem(symbol);

            return amount ? amount : 0;
        }
    },

    components: {
        CryptoTable,
        CryptoLoader,

    },
};
</script>
