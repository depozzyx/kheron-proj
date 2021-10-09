class CustomDate extends Date {
    yyyymmdd = function () {
        // @ts-ignore
        const self = this;

        const mm = self.getMonth() + 1; // getMonth() is zero-based
        const dd = self.getDate();
        return [
            (dd > 9 ? "" : "0") + dd,
            (mm > 9 ? "" : "0") + mm,
            self.getFullYear(),
        ].join(".");
    };
}

export { CustomDate };
