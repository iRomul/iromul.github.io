<template>
    <div id="app">
        <div id="container">
            <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <router-link to="/" class="navbar-brand">My Tools</router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav mr-auto">
                        <router-link tag="li" class="nav-item" to="/imp_prettifier">
                            <a class="nav-link">Import Prettifier</a>
                        </router-link>

                        <router-link tag="li" class="nav-item" to="/bookmarklet">
                            <a class="nav-link">Bookmarklets</a>
                        </router-link>
                    </ul>
                </div>
            </nav>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    import HomePage from './HomePage.vue'
    import ImportOptimizer from './ImportOptimizer.vue'

    import BookmarkletGenerator from './bookmarklets/components/BookmarkletGenerator.vue'
    import SimpleGenerator from './bookmarklets/components/SimpleGenerator.vue'
    import SimpleBuilder from './bookmarklets/components/SimpleBuilder.vue'

    import PageNotFound from './PageNotFound.vue'
    import Vue from 'vue';
    import VueRouter from 'vue-router';

    Vue.use(VueRouter);

    const routes = [
        {path: '/', component: HomePage},
        {path: '/imp_prettifier', component: ImportOptimizer},
        {
            path: '/bookmarklet',
            component: BookmarkletGenerator,
            children: [
                {path: '/', redirect: 'js'},
                {path: 'js', component: SimpleGenerator},
                {path: 'builder', component: SimpleBuilder}
            ]
        },
        {path: '*', component: PageNotFound}
    ];

    const router = new VueRouter({
        mode: 'history',
        linkActiveClass: 'active',
        routes
    });

    export default {
        name: 'app',
        router,
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap.scss";
</style>
