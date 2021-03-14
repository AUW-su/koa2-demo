module.exports = {
    // add ...
    get method() {
        return this.request.method
    },
    get url() {
        return this.request.url;
    },
    get body() {
        return this.request.body;
    },
    set body(val) {
        this.request.body = val;
    },
}