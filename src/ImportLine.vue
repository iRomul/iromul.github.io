<template>
    <span>
        <span v-for="part in split(line)" :class="{'sh-keyword': isKeyword(part)}">{{ part }} </span>
    </span>
</template>

<script>
    const KEYWORDS = ['package', 'import', 'static', 'as'];

    export default {
        props: {
            line: {
                type: String,
                required: true
            }
        },

        methods: {
            split(str) {
                return str.split(/\s/);
            },

            isKeyword(str) {
                return KEYWORDS.indexOf(str) !== -1;
            }
        }
    }
</script>

<style>
    .sh-keyword {
        font-weight: bold;
        color: #000080;
    }
</style>