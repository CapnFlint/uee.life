<template>
    <dock-item title="Community Links" class="community-links">
        <div v-for="link in links" :key="link.url" class="link">
            <a :href="link.url" target="_blank">{{link.name}}</a>
        </div>
    </dock-item>
</template>

<script>
import { gsap } from 'gsap'

export default {
    name: 'community-links',
    components: {
    },
    data() {
        return {
            links: [
                {name: "SC Wiki", url: "https://starcitizen.tools"},
                {name: "Erkul fitting Calculator", url: "https://erkul.games/calculator"},
                {name: "Gallog Trade Tool", url: "https://gallog.co/trading/"},
                {name: "Mining Yield Calculator", url: "https://robertsspaceindustries.com/community/citizen-spotlight/16649-Mining-Yield-Calculator"},
                {name: "Starship42 Ship Viewer", url: "https://www.starship42.com"},
                {name: "GameGlass", url: "https://gameglass.gg"},
                {name: "Bar Citizens", url: "https://barcitizen.sc"}
            ]
        }
    },
    mounted() {
        gsap.to('.community-links', {duration: 0.5, opacity: 1})
    }
}
</script>

<style>
    .community-links {
        opacity: 1;
    }

    .community-links>.link::before {
      content: "> "
    }
    .community-links>.link {
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 3px;
    }
    .community-links>.link>a {
      text-decoration: none;
      color: #39ced8;
    }
    .community-links>.link>a:hover {
      color: #dbf3ff;    
    }
</style>