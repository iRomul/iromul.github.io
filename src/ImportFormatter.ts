enum Groups {
    PACKAGE = 0,
    OPTIMA_WILDCARD,
    OPTIMA,
    OPTIMA_STATIC,
    OPTIMA_EXCEPTION,
    MISC,
    MISC_WILDCARD
}

export class ImportFormatter {

    private lines: string[];

    constructor(str: string) {
        this.lines = str
            .split("\n")
            .map(value => value.trim())
            .filter(value => value.length > 0);
    }

    groupByType(): { [key: number]: string[] } {
        return this.group();
    }

    private group(): { [key: number]: string[] } {
        let groups: { [key: number]: string[] } = {};

        for (let line of this.lines) {
            let key: number;

            if (ImportFormatter.isPackage(line)) {
                key = Groups.PACKAGE
            } else if (ImportFormatter.isImport(line)) {
                if (ImportFormatter.isOptimaImport(line)) {
                    if (ImportFormatter.isStaticImport(line)) {
                        key = Groups.OPTIMA_STATIC;
                    } else if (ImportFormatter.isWildcardImport(line)) {
                        key = Groups.OPTIMA_WILDCARD;
                    } else if (ImportFormatter.isException(line)) {
                        key = Groups.OPTIMA_EXCEPTION;
                    } else {
                        key = Groups.OPTIMA;
                    }
                } else {
                    if (ImportFormatter.isWildcardImport(line)) {
                        key = Groups.MISC_WILDCARD;
                    } else {
                        key = Groups.MISC;
                    }
                }
            } else {
                key = -1
            }

            if (key >= 0) {
                if (groups[key]) {
                    groups[key].push(line);
                } else {
                    groups[key] = [line];
                }
            }
        }

        for (let key in groups) {
            let val = groups[key];

            val.sort();
        }

        return groups;
    }

    private static isPackage(a: string): boolean{
        return a.indexOf("package ") != -1;
    }

    private static isImport(a: string): boolean {
        return a.indexOf("import ") != -1;
    }

    private static isException(a: string): boolean {
        return a.indexOf("Exception") != -1;
    }

    private static isOptimaImport(a: string): boolean {
        return a.indexOf(" optima.") != -1;
    }

    private static isStaticImport(a: string): boolean {
        return a.indexOf(" static ") != -1;
    }

    private static isWildcardImport(a: string): boolean {
        return a.indexOf("*", a.length - 1) != -1;
    }
}