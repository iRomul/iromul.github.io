export class BookmarkletsUtil {

    static convertFromJs(str: string): string {
        const wrapped = BookmarkletsUtil.wrapCodeIntoFunction(str);
        const encoded = encodeURIComponent(wrapped);

        return "javascript:" + encoded;
    }

    static buildLoader(controllerRaw: string, action: string, type: string): string {
        const controller = BookmarkletsUtil.extractControllerName(controllerRaw);

        let js = "";

        if (type == "ll") {
            js = `loadLink(basedir + "${controller}/${action}", "layoutBody");`;
        } else if (type == "lls") {
            js = `loadLinkSimple("${controller}/${action}");`;
        } else if (type == "ml") {
            js = `commonF.openMenuElement("${controller}");`;
        }

        return BookmarkletsUtil.convertFromJs(js);
    }

    private static extractControllerName(controllerRaw: string): string {
        let controller = controllerRaw;

        const extensionPos = controller.lastIndexOf(".groovy");

        if (extensionPos != -1) {
            controller = controller.substring(0, extensionPos);
        }

        const controllerPos = controller.lastIndexOf("Controller");

        if (controllerPos != -1) {
            controller = controller.substring(0, controllerPos)
        }

        return controller;
    }

    private static wrapCodeIntoFunction(str: string): string {
        return `(function(){${str}})();`;
    }
}