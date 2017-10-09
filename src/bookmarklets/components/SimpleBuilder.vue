<template>
    <div class="row">
        <div class="col">
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Controller</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="controller">
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Action</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="action">
                </div>
            </div>

            <fieldset class="form-group">
                <div class="row">
                    <legend class="col-form-legend col-sm-2">Type</legend>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" v-model="type" value="ll">
                                Load link
                                <small class="form-text text-muted">
                                    loadLink(basedir + "controller/action", "layoutBody");
                                </small>
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" v-model="type" value="lls">
                                Load link simple
                                <small class="form-text text-muted">loadLinkSimple("controller/action");</small>
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" v-model="type" value="ml">
                                Menu link
                                <small class="form-text text-muted">commonF.openMenuElement("controller");</small>
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>

            <button class="btn btn-primary" @click="build">Get bookmarklet</button>
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
                controller: "",
                action: "",
                type: "ll",
                result: "",
                convertedLinkName: ""
            }
        },

        computed: {
            linkName() {
                return this.convertedLinkName ? this.convertedLinkName : 'Drag Me';
            }
        },

        methods: {
            build() {
                const controller = this.controller;
                const action = this.action;
                const type = this.type;

                this.result = BookmarkletsUtil.buildLoader(controller, action, type);
            }
        }
    }
</script>