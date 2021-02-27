<template>
<div id="app ">
    <div class="d-flex justify-content-center mt-5 p-5">
        <table-row :coins="this.coins"></table-row>
    </div>

    <router-view />
</div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>

<script>

import axios from "axios";

import tableRow from "@/components/tableRow";

export default {
    data() {
        return {
            coins: [],

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
        this.getCrypto();

        setInterval(this.getCrypto, 60000);

    },

    methods: {
        getCrypto(){
            axios
            .get('http://localhost:5000/cryptocurrency/listings/latest?limit=50') 
            .then(response => {
                this.coins = response.data.data.map(x => {
                    return {
                        name: x.name,
                        symbol: x.symbol,
                        price: x.quote.USD.price,
                        percentChange: x.quote.USD.percent_change_24h
                    }
                });                
            })
            .catch(error => console.log(error));
        }
    },

    components: {
        tableRow,
       
    },
};
</script>
