<template>
<div class="details-page-component">
    <crypto-loader v-if="isLoading"></crypto-loader>
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Symbol</th>
                <th scope="col">Coin Market Cap rank</th>
                <th scope="col">Market cap</th>
                <th scope="col">USD price</th>
                <th scope="col">Mining availability</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ cryptoCurrency.name }}</td>
                <td>{{ cryptoCurrency.symbol }}</td>

                <td>{{ cryptoCurrency.cmc_rank }}</td>
                <td>{{ cryptoCurrency.market_cap }}</td>
                <td>{{ cryptoCurrency.usd_market_price }}</td>
                <td>{{ cryptoCurrency.minable }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import axios from "axios";
import CryptoLoader from "../components/CryptoLoader";

export default {
    mounted() {},

    created() {
        const cryptoId = this.$route.params.id;
        this.isLoading = true;
        axios
            .get("http://localhost:5000/cryptocurrency/quotes/latest?id=" + cryptoId)
            .then((response) => {
                console.log(response.data.data[cryptoId]);
                const cryptoFromApi = response.data.data[cryptoId];
                this.cryptoCurrency.name = cryptoFromApi.name;
                this.cryptoCurrency.market_cap = cryptoFromApi.quote.USD.market_cap;
                this.cryptoCurrency.cmc_rank = cryptoFromApi.cmc_rank;
                this.cryptoCurrency.symbol = cryptoFromApi.symbol;
                this.cryptoCurrency.usd_market_price = cryptoFromApi.quote.USD.price;
                this.cryptoCurrency.minable = cryptoFromApi.tags[0];

                this.isLoading = false;
            })
            .catch((error) => {
                this.isLoading = false;
                console.log(error);
            });
    },

    data() {
        return {
            isLoading: false,
            cryptoCurrency: {
                name: "",
                symbol: "",
                cmc_rank: "",
                market_cap: "",
                usd_market_price: "",
                minable: "",
            },
        };
    },
    components: {
        CryptoLoader,
    },
};
</script>

<style lang="scss">
.details-page-component {
    
}
</style>
