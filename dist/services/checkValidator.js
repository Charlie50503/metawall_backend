"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckValidator = void 0;
var validator_1 = __importDefault(require("validator"));
var lodash_1 = __importDefault(require("lodash"));
var CheckValidator = /** @class */ (function () {
    function CheckValidator() {
    }
    /**
     * @static
     * @description 驗證傳入參數是否符合驗證規則
     * @param {({ [key: string]: string | undefined })} params
     * @memberof CheckValidator
     */
    CheckValidator.checkerParams = function (params) {
        for (var _i = 0, _a = Object.entries(params); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (!lodash_1.default.isString(value)) {
                console.log("key", key, "value", value);
                throw new Error("欄位未填寫正確");
            }
            switch (key) {
                case "nickName":
                    if (!lodash_1.default.isString(value)) {
                        throw new Error("必須是 String");
                    }
                    if (!validator_1.default.isLength(value, { min: 2 })) {
                        throw new Error("name 至少 2 個字以上");
                    }
                    break;
                case "sex":
                    if (!lodash_1.default.isString(value)) {
                        throw new Error("必須是 String");
                    }
                    if (!["male", "female"].includes(value)) {
                        throw new Error("sex 只能是 male 或是 female");
                    }
                    break;
                case "email":
                    if (!lodash_1.default.isString(value)) {
                        throw new Error("必須是 String");
                    }
                    if (!validator_1.default.isEmail(value)) {
                        throw new Error("Email 格式不對");
                    }
                    break;
                case "password":
                    if (!lodash_1.default.isString(value)) {
                        throw new Error("必須是 String");
                    }
                    if (!validator_1.default.isLength(value, { min: 8 })) {
                        throw new Error("密碼需要至少 8 碼以上");
                    }
                    if (validator_1.default.isAlpha(value)) {
                        console.log("只有英字");
                        throw new Error("密碼需要英數混和!");
                    }
                    if (validator_1.default.isNumeric(value)) {
                        console.log("只有數字");
                        throw new Error("密碼需要英數混和!");
                    }
                    if (validator_1.default.isStrongPassword(value, { returnScore: true }) <= 20) {
                        throw new Error("密碼不夠強");
                    }
                    if (!validator_1.default.isLength(value, { min: 8 })) {
                        throw new Error("密碼需要至少 8 碼以上");
                    }
                    break;
                case "content":
                    if (!lodash_1.default.isString(value)) {
                        throw new Error("必須是 String");
                    }
                    break;
                case "imgUrl":
                    if (!lodash_1.default.isString(value)) {
                        throw new Error("必須是 String");
                    }
                    break;
                case "comment":
                    if (!lodash_1.default.isString(value)) {
                        throw new Error("必須是 String");
                    }
                    break;
            }
        }
    };
    CheckValidator.comparePassword = function (params) {
        var password = params.password, confirmPassword = params.confirmPassword;
        if (!password) {
            throw new Error("格式不正確");
        }
        if (!confirmPassword) {
            throw new Error("格式不正確");
        }
        if (password !== confirmPassword) {
            throw new Error("密碼不一致");
        }
    };
    return CheckValidator;
}());
exports.CheckValidator = CheckValidator;
