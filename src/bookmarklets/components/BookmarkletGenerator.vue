<template>
    <div class="container">
        <h2>Simple bookmarklet generator</h2>

        <ul class="nav nav-tabs nav-padded">
            <li class="nav-item">
                <router-link to="/bookmarklet/js" class="nav-link">From JS</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/bookmarklet/builder" class="nav-link">Builder</router-link>
            </li>
        </ul>

        <router-view></router-view>
    </div>
</template>

<script>
    import SimpleGenerator from './SimpleGenerator.vue'

    export default {
        components: {
            SimpleGenerator
        }
    }
</script>

<style>

</style>