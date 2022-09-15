"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandle = void 0;
var successHandle = function (req, res, data) {
    res.status(200).json({
        status: "success",
        data: data,
    });
    res.end();
};
exports.successHandle = successHandle;
