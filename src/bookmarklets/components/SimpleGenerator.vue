<template>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label for="source-area">Source</label>
                <textarea id="source-area" class="form-control" rows="15" v-model="source"></textarea>
            </div>

            <button class="btn btn-primary" @click="convertJs">Get bookmarklet</button>
        </div>

        <div class="col">
            <div class="form-group">
                <label for="result-area">Result</label>
                <textarea id="result-area" class="form-control" rows="15" :value="result"></textarea>
            </div>

            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Name" v-model="convertedLinkName"/>
                </div>

                <div class="col">
                    <a :href="result" v-if="result.length > 0">
                        {{ linkName }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {BookmarkletsUtil} from '../BookmarkletsUtil';

    export default {
        data() {
            return {
                source: "",
                result: "",
                convertedLinkName: ""
            }
        },

        computed: {
            linkName() {
                return this.convertedLinkName ? this.convertedLinkName : 'Drag Me'
            }
        },

        methods: {
            convertJs() {
                const source = this.source;
                this.result = BookmarkletsUtil.convertFromJs(source);
            }
        }
    }
</script>