<template>
    <div class="citizen-results">
        <portal to="leftDock">
            <dock-item title="find citizens" class="search-box">
                <input class="search-input" @keyup.enter="getResults()" v-model="input" placeholder="Citizen Handle"/>
            </dock-item>
        </portal>
        <section-title text="citizen registry" size="large"/>
        <div v-if="result" class="results">
            <div class="org-cell">
                <router-link class="no-decor" :to="citizenLink">
                    <span class="left">
                        <span class="thumb">
                            <img :src="result.portrait" />
                        </span>
                        <span class="identity">
                            <h3 class="name">{{result.name}}</h3>
                            <span class="symbol">{{result.handle}}</span>
                            <span v-if="result.org" class="org">Organization: {{result.org}}</span>
                        </span>
                    </span>
                </router-link>
            </div>
        </div>
        <div v-else class="no-results">
            <span class="text big">
                No Results
                <div class="endcap left"></div>
                <div class="endcap right"></div>
            </span>
            <span class="text small">Use the box on the left to search</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'citizen-results',
    data() {
        return {
            result: "",
            input: ""
        }
    },
    methods: {
        async getResults() {
            try {
                const { data } = await this.$axios.get('https://api.uee.life/citizens/' + this.input + '/info')
                if(data.error) {
                    this.result = '<div class="no-results"><span class="text big">No Results<div class="endcap left"></div><div class="endcap right"></div></span><span class="text small">That citizen was not found!</span></div>'
                } else {
                    this.result = data
                }
            } catch (error) {
                // eslint-disable-next-line
                console.error(error)
            }
        }
    },
    computed: {
        citizenLink() {
            return `/citizens/${this.result.handle}`;
        }
    }

}
</script>

<style scoped>
    .citizen-results {
        position: relative;
        width: 100%;
        padding: 10px;
    }

    .no-results {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .no-results>.text {
        position: relative;
        width: fit-content;
        padding-left: 20px;
        padding-right: 20px;
        margin: 20px;
    }

    .no-results>.text.big {
        font-family: 'Michroma';
        font-size: 25px;
    }

    .search-box .search-input {
        margin: 5px;
        width: calc(100% - 10px);
        box-sizing: border-box;
    }

    .results {
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }
    .org-cell {
        display: flex;
        flex-grow: 1;
        margin: 5px;
    }

    .org-cell>a {
        display: flex;
        align-items: center;
        background: url('/images/fading-bars.png') repeat;
        padding: 20px;
        position: relative;
        height: fit-content;
        border: 1px solid #546f84;
        flex-grow: 1;
    }

    .org-cell>a>.left {
        display: flex;
    }

    .org-cell>a>.left>.thumb {
        display: inline-block;
        width: 70px;
        height: 70px;
        position: relative;
    }

    .org-cell>a>.left>.thumb>img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .org-cell>a>.left>.identity {
        display: flex;
        line-height: 16px;
        max-width: 250px;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
    }

    .org-cell>a>.left>.identity>h3 {
        font-size: 21px;
        color: #dbf3ff;
        margin: 0;
        letter-spacing: 2px;
    }

    .org-cell>a>.left>.identity>.org {
        font-size: 15px;
        color: #739cb0;
        margin-top: 15px;
    }

    .org-cell>a>.left>.identity>.symbol {
        font-size: 15px;
        color: #739cb0;
    }

    .org-cell>a>.right {
        display: none;
    }

    .no-decor {
        text-decoration: none;
    }

</style>