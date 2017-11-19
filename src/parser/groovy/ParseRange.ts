export default class ParseRange {

    public begin: number;
    public end: number;

    constructor(begin: number, end: number) {
        this.begin = begin;
        this.end = end;
    }

    public extractOn(text: string) {
        return text.substring(this.begin, this.end);
    }
}