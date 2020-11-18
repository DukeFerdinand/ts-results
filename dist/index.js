"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.err = exports.ok = exports.Err = exports.Ok = exports.ResultType = void 0;
var ResultType;
(function (ResultType) {
    ResultType["Ok"] = "Ok";
    ResultType["Err"] = "Err";
})(ResultType = exports.ResultType || (exports.ResultType = {}));
class Ok {
    constructor(val) {
        this.value = val;
        this.type = ResultType.Ok;
    }
    isOk() { return true; }
    isErr() { return false; }
    unwrap() { return this.value; }
    unwrapErr() {
        throw new TypeError('[RESULT ERROR] Attempted to call `unwrapErr` on `Ok` Result variant');
    }
}
exports.Ok = Ok;
class Err {
    constructor(val) {
        this.value = val;
        this.type = ResultType.Err;
    }
    isOk() { return false; }
    isErr() { return true; }
    unwrap() {
        throw new TypeError('[RESULT ERROR] Attempted to call `unwrapErr` on `Ok` Result variant');
    }
    unwrapErr() { return this.value; }
}
exports.Err = Err;
exports.ok = (val) => new Ok(val);
exports.err = (val) => new Err(val);
