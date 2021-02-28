<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8">
           
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Short name</th>
                            <th>$Value</th>
                            <th>Last 24h</th>
                            <th>Amount you own</th>
                            <th>$ Value of your coin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="coin in coins" :key="coin.symbol">
                            <td>
                                <router-link :to="'/DetailsPage/' + coin.id">{{coin.name}}</router-link>
                            </td>
                            <td>{{ coin.symbol }}</td>
                            <td>{{ coin.price }}</td>
                            <td v-bind:class="[coin.percentChange < 0 ? 'negative' : 'positive']" >{{ coin.percentChange }} %</td>
                            <td>
                                <form v-on:submit.prevent="onSubmit">
                                    <input type="hidden" id="coinSymbol" name="coinSymbol" :value="coin.symbol" />

                                    <input type="number" id="ownedCoins" name="ownedCoins" v-model="coin.inputedCoins" />
                                    <div style="margin-top: 5px;">
                                        <button v-bind:disabled="isDisabled(coin)" type="submit" style="width:50%;">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </td>
                            <td>
                                {{ getOwnedCoinsPrice(coin) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
           
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["coins"],

    methods: {
        getOwnedCoinsPrice(coin) {
            return coin.coinsOwned * coin.price
        },
        onSubmit(submitEvent) {

            // put coin in local storage, key = coin symbol
            localStorage.setItem(
                submitEvent.target.elements.coinSymbol.value,
                submitEvent.target.elements.ownedCoins.value
            );

            // find coin by short name, and update owned coins, so the '$ Value of your coin' changes also on submit
 
            let coin = this.coins.find(x => x.symbol === submitEvent.target.elements.coinSymbol.value);
        
            coin.coinsOwned = submitEvent.target.elements.ownedCoins.value
        },
        isDisabled(coin){
            return coin.inputedCoins === '' || coin.inputedCoins < 0;
        }
    },
    computed: {},

    data() {
        return {
        };
    },
    mounted() {},

    created() {},
};
</script>

<style lang="scss">

.table tr:nth-child(even) {
    background:#d8d8d8;
}

.positive {
    color: green;
}

.negative {
    color: red;
}
</style>
