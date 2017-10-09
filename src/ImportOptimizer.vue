<template>
    <div class="container-fluid">
        <h2>Optima import prettifier</h2>

        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="import-text-input">Input text</label>
                    <textarea id="import-text-input" class="form-control" rows="20" v-model="input"></textarea>
                </div>

                <button class="btn btn-primary" @click="format()">Make it pretty!</button>
            </div>
            <div class="col">
                <div class="form-group">
                    <label>Output text</label>

                    <div class="line" v-for="line in flattenGroups" style="white-space: pre-wrap;"><ImportLine :line="line"></ImportLine></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ImportFormatter} from './ImportFormatter';
    import ImportLine from './ImportLine.vue';

    export default {
        data() {
            return {
                input: "",
                groups: {}
            }
        },

        methods: {
            format() {
                const formatter = new ImportFormatter(this.input);

                this.groups = formatter.groupByType();
            }
        },

        computed: {
            flattenGroups() {
                const lines = [];

                for (const groupKeys of Object.keys(this.groups)) {
                    const group = this.groups[groupKeys];

                    for (const line of group) {
                        lines.push(line);
                    }

                    lines.push("");
                }

                return lines;
            }
        },

        components: {
            ImportLine: ImportLine
        }
    }
</script>

<style>
    .src-output {
        padding: 10px;
        font-family: Monospaced, monospace;
    }

    /*.line {*/
        /*min-height: 1em;*/
    /*}*/
</style>