<template>
    <div class="container-fluid">
        <h2>
            Optima preset boilerplate
            <small class="text-muted" v-if="hasResult">{{ reportName }}</small>
        </h2>

        <ul class="nav nav-tabs nav-padded">
            <li class="nav-item">
                <a href="#" class="nav-link" :class="{ 'active': tab === 'source' }" @click="changeTab('source')">
                    Source
                </a>
            </li>
            <li class="nav-item" v-if="hasResult">
                <a href="#" class="nav-link" :class="{ 'active': tab === 'result' }" @click="changeTab('result')">
                    Result
                </a>
            </li>
        </ul>

        <div class="row" v-if="tab === 'source'">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="controller-source">Controller source code</label>
                    <textarea id="controller-source" class="form-control" rows="15" v-model="controllerSource"></textarea>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <label for="data-source">Data class code</label>
                    <textarea id="data-source" class="form-control" rows="15" v-model="dataSource"></textarea>
                </div>
            </div>
        </div>

        <div class="row" v-if="tab === 'result'">
            <div class="col-md-4">
                <div class="form-group">
                    <label for="controller-result">Controller code</label>
                    <textarea id="controller-result" class="form-control" rows="15" v-model="controllerOutputSrc"></textarea>
                </div>
            </div>

            <div class="col-md-4">
                <div class="form-group">
                    <label for="service-result">Service code</label>
                    <textarea id="service-result" class="form-control" rows="15" v-model="serviceOutputSrc"></textarea>
                </div>
            </div>

            <div class="col-md-4">
                <div class="form-group">
                    <label for="data-result">Data code</label>
                    <textarea id="data-result" class="form-control" rows="15" v-model="dataOutputSrc"></textarea>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-primary" @click="convert">Convert</button>
                    <button type="button" class="btn btn-info" @click="clear">Clear</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ReportScanner from '../ReportConverter';

    export default {
        data() {
            return {
                tab: 'source',
                hasResult: false,

                controllerSource: "",
                dataSource: "",

                reportName: "",

                controllerOutputSrc: "",
                serviceOutputSrc: "",
                dataOutputSrc: ""
            }
        },

        methods: {
            changeTab(tabName) {
                this.tab = tabName;
            },

            convert() {
                const converter = new ReportScanner(this.controllerSource, this.dataSource);

                if (!this.controllerSource || !this.dataSource) {
                    this.showError("Source code is empty");
                } else {
                    try {
                        converter.convert();

                        this.reportName = converter.reportName;

                        this.serviceOutputSrc = converter.formattedServiceCode;
                        this.dataOutputSrc = converter.formattedDataCode;

                        this.hasResult = true;

                        this.showSuccess();
                    } catch (e) {
                        console.error(e);
                        this.showError(e.message);
                    }
                }
            },

            clear() {
                this.tab = 'source';
                this.hasResult = false;

                this.controllerSource = "";
                this.dataSource = "";

                this.reportName = "";

                this.controllerOutputSrc = "";
                this.serviceOutputSrc = "";
                this.dataOutputSrc = "";
            },

            showSuccess() {
                this.$notify({
                    title: "Success",
                    text: `Report ${this.reportName} successfully converted`
                });
            },

            showError(e) {
                this.$notify({
                    title: "Error",
                    text: e,

                    width: 400,

                    type: "error",
                    duration: 5000
                });
            }
        }
    }
</script>

<style>

</style>