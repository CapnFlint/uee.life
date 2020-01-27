<template>
    <div id="ship-summary" class="ship-summary">
        <section-title v-if="ship.name" :text="ship.name"/>
        <img :src="shipImage" />
        <img class="manufacturer" :src="manufacturerImage" />
        <div class="ship-info">
            <h5>{{ ship.model }}</h5>
            <div>{{ ship.type }} - {{ ship.focus }}</div>
            <div v-if="ship.owner">Owner: <nuxt-link :to="citizenLink">{{ship.owner}}</nuxt-link></div>
        </div>
        <span class="corner top left"></span>
        <span class="corner top right"></span>
        <span class="corner bottom left"></span>
        <span class="corner bottom right"></span>
    </div>
</template>

<script>
export default {
    name: 'ship-summary',
    props: ["ship"],
    computed: {
        shipImage: function() {
            return `/images/ships/${this.ship.short_name}.jpg`
        },
        manufacturerImage: function () {
            return `/images/manufacturers/${this.ship.make_abbr}.png`
        },
        citizenLink: function () {
            return `/citizens/${this.ship.owner}`
        }
    }
}
</script>

<style scoped>
    img {
        max-width: 75px;
        flex-basis: 90%;
        flex-grow: 1;
    }

    .ship-summary {
        display: flex;
        flex-grow: 1;
        margin: 5px;
        margin-bottom: 10px;
        padding: 9px;
        position: relative;
        background: url('/images/fading-bars.png') repeat;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .ship-info {
        margin-left: 10px;
        z-index: 2;
        font-size: calc(12px + (14 - 12) * ((100vw - 300px) / (1600 - 300)));
        line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300)));
    }

    .ship-info>h5 {
        font-size: calc(13px + (16 - 13) * ((100vw - 300px) / (1600 - 300)));
        line-height: calc(1.5em + (1.5 - 1.4) * ((100vw - 300px)/(1600 - 300)));
    }

    .manufacturer {
        position: absolute;
        right: 0;
        align-self: center;
        width: 70px;
        opacity: 0.8;
    }
</style>