import GroovyScanner from "../parser/groovy/GroovyScanner";
import FilterNaming from "./FilterNaming";

export default class ReportConverter {

    private _controller: GroovyScanner;
    private _data: GroovyScanner;

    private _reportName: string;

    private _formattedService: string;
    private _formattedData: string;

    constructor(controllerSrc: string, dataSrc: string) {
        this._controller = new GroovyScanner("controller", controllerSrc);
        this._data = new GroovyScanner("data", dataSrc);
    }

    convert() {
        this.updateReportName();

        const controllerPackage = this._controller.findPackageName();
        const serviceName = FilterNaming.serviceName(this._reportName);

        const dataPackage = this._data.findPackageName();
        const dataName = this._data.findClassIdentifier();

        const periodic = this.ensureAndModifyPeriodicReport();

        this.updateServiceTemplate(serviceName, controllerPackage, dataName, dataPackage, periodic);
        this.updateDataTemplate();
    }

    get reportName(): string {
        return this._reportName;
    }

    get formattedServiceCode(): string {
        return this._formattedService;
    }

    get formattedDataCode(): string {
        return this._formattedData;
    }

    private updateReportName() {
        const controllerName = this._controller.findClassIdentifier();
        this._reportName = FilterNaming.reportNameFromController(controllerName);
    }

    private ensureAndModifyPeriodicReport(): boolean {
        let dataSrc = this._data.src;

        const periodic = dataSrc.indexOf("Date startDate") !== -1 && dataSrc.indexOf("Date finishDate") !== -1;

        if (periodic) {
            dataSrc = dataSrc.replace(/^.*Date startDate.*$/m, "");
            dataSrc = dataSrc.replace("Date finishDate", "AutoPeriod period");
        }

        this._data.src = dataSrc;

        return periodic;
    }

    private updateServiceTemplate(serviceName: string, servicePackage: string, dataName: string, dataPackage: string, periodic: boolean) {
        this._formattedService = `package ${servicePackage}

import ${dataPackage}.${dataName}

import optima.utils.traits.data.UserContext
import optima.web.wrappers.ParamsWrapper
import org.codehaus.groovy.grails.web.servlet.mvc.GrailsParameterMap

class ${serviceName} {

    static transactional = false

    ${dataName} createData() {
        ${dataName} data = new ${dataName}()

        /* Put code here */

        return data
    }
    
    ${dataName} copyData(${dataName} reportData) {
        ${dataName} data = new ${dataName}()

        ${periodic ? "data.period = reportData.period" : "/* Put code here */"}

        return data
    }
    
    def loadFormData(${dataName} reportData, UserContext userContext, GrailsParameterMap rawParams) {
        ParamsWrapper params = new ParamsWrapper(rawParams)

        /* Put code here */

        return true
    }
    
    def loadGlobalData(${dataName} reportData, UserContext userContext, Map innerSettings) {
        /* Put code here */
    }
}`;
    }

    private updateDataTemplate() {
        this._formattedData = this._data.src;
    }
}