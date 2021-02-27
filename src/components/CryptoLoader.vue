<template>
<div>
    <div class="loader-overlay" id="loading">
        <h1>Loading...</h1>
    </div>
</div>
</template>

<script>
export default {
    props: [],

    data() {
        return {
            isLoading: true,
        };
    },
};
</script>

<style lang="scss">
.loader-overlay {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.637);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    color: white;
    text-align: center;
}


</style>
