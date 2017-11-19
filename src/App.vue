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

                        <router-link tag="li" class="nav-item" to="/presetter">
                            <a class="nav-link">Presetter</a>
                        </router-link>
                    </ul>
                </div>
            </nav>
        </div>

        <router-view></router-view>
        
        <notifications/>
    </div>
</template>

<script>
    import HomePage from './HomePage.vue'
    import ImportOptimizer from './ImportOptimizer.vue'

    import BookmarkletGenerator from './bookmarklets/components/BookmarkletGenerator.vue'
    import SimpleGenerator from './bookmarklets/components/SimpleGenerator.vue'
    import SimpleBuilder from './bookmarklets/components/SimpleBuilder.vue'

    import Presetter from './presetter/components/Presetter.vue'

    import PageNotFound from './PageNotFound.vue'

    import Vue from 'vue';
    import VueRouter from 'vue-router';

    import Notifications from 'vue-notification';

    Vue.use(VueRouter);
    Vue.use(Notifications);

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
        {path: '/presetter', component: Presetter},
        {path: '*', component: PageNotFound}
    ];

    const router = new VueRouter({
        mode: 'hash',
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

    .nav-padded {
        margin-bottom: 20px;
    }
</style>
