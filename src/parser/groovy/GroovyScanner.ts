import ParseRange from "./ParseRange";

enum GroovyTokens {
    CLASS = "class",
    PACKAGE = "package",
    BLOCK_OPEN = "{",
    BLOCK_CLOSE = "}",
    TERMINAL_COLON = ";",
    TERMINAL_NEWLINE = "\n"
}

export default class GroovyScanner {

    public src: string;

    private name: string;
    private pos: number;

    constructor(name: string, src: string) {
        this.name = name;

        this.src = src;
        this.pos = 0;
    }

    public findClassIdentifier(): string {
        const range = this.findClassIdentifierPosition();

        return range.extractOn(this.src)
    }

    public findPackageName(): string {
        const range = this.findPackagePosition();

        return range.extractOn(this.src);
    }

    private findPackagePosition(): ParseRange {
        this.pos = this.src.indexOf(GroovyTokens.PACKAGE);

        if (this.pos === -1) {
            this.throwParseError("Can't find package declaration");
        }

        this.pos += GroovyTokens.PACKAGE.length;

        this.skipSpaces();

        const nameBegin = this.pos;

        if (this.skipNonTerminals() === 0) {
            this.throwParseError("Can't find package fully qualified name");
        }

        const nameEnd = this.pos;

        return new ParseRange(nameBegin, nameEnd);

    }

    private findClassIdentifierPosition(): ParseRange {
        this.pos = this.src.indexOf(GroovyTokens.CLASS);

        if (this.pos === -1) {
            this.throwParseError("Can't find class definition start")
        }

        this.pos += GroovyTokens.CLASS.length;

        this.skipSpaces();

        const identifierBegin = this.pos;

        if (this.skipAlpha() === 0 || this.eof()) {
            this.throwParseError("Can't find class identifier")
        }

        const identifierEnd = this.pos;

        return new ParseRange(identifierBegin, identifierEnd);
    }

    private skipSpaces(): number {
        const src = this.src;
        const len = src.length;

        let count: number = 0;

        for (let i = this.pos; i < len; i++) {
            const char = src.charAt(i);

            if (char === " " || char === "\n" || char === "\t") {
                count++;
            } else {
                break;
            }
        }

        this.pos += count;

        return count;
    }

    private skipAlpha(): number {
        const src = this.src;
        const len = src.length;

        let count: number = 0;

        for (let i = this.pos; i < len; i++) {
            const char = src.charAt(i);

            if (/[a-zA-Z]/.test(char)) {
                count++;
            } else {
                break;
            }
        }

        this.pos += count;

        return count;
    }

    private skipNonTerminals(): number {
        const src = this.src;
        const len = src.length;

        let count: number = 0;

        for (let i = this.pos; i < len; i++) {
            const char = src.charAt(i);

            if (char !== GroovyTokens.TERMINAL_COLON && char !== GroovyTokens.TERMINAL_NEWLINE) {
                count++;
            } else {
                break;
            }
        }

        this.pos += count;

        return count;
    }

    private eof(): boolean {
        return this.pos >= (this.src.length - 1);
    }

    private throwParseError(message: string) {
        throw new Error(`${message} (file: ${this.name})`);
    }
}