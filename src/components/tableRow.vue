<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8">
            <div class="example">
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
                            <td>{{ coin.name }}</td>
                            <td>{{ coin.symbol }}</td>
                            <td>{{ coin.price }}</td>
                            <td>{{ coin.percentChange }} %</td>
                            <td>
                              <form v-on:submit.prevent="onSubmit">
                                <input type="hidden" id="coinSymbol" name="coinSymbol" :value="coin.symbol">
                                <input type="number" id="ownedCoins" name="ownedCoins" :value="getOwnedCoins(coin.symbol)" >
                                <button type="submit" >Submit</button>
                              </form>

                            </td>
                            <td>{{ getOwnedCoins(coin.symbol) * coin.price }}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        </div>
    </div>

</template>

<script>
export default {
    
    props: ['coins'],

    methods:{
      getOwnedCoins(symbol) {
        let amount = localStorage.getItem(symbol);
        return amount ? amount : 0;
      },
      onSubmit(submitEvent){
        localStorage.setItem(submitEvent.target.elements.coinSymbol.value, submitEvent.target.elements.ownedCoins.value);
      }
    },
    computed: {
    },

    data() {
        return {
          
        };
    },
    mounted() {
    },
};
</script>

<style lang="scss">
.tableWrapper {
    background-color: lightgray;
    display: flex;
    width: 100vw;
}

.box1 {
    width: 20%;
}

.box2 {
    width: 20%;
}
</style>
