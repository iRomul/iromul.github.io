import {upperFirst, lowerFirst} from "lodash";

export default class FilterNaming {

    public static serviceName(str: string): string {
        return `${upperFirst(str)}Service`;
    }

    public static reportNameFromController(str: string): string {
        const pos = str.lastIndexOf("Controller");

        if (pos !== -1) {
            return lowerFirst(str.substring(0, pos));
        } else {
            return str;
        }
    }
}