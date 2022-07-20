import validator from "validator";
import _ from "lodash";
export class CheckValidator {

  /**
   * @static
   * @description 驗證傳入參數是否符合驗證規則
   * @param {({ [key: string]: string | undefined })} params
   * @memberof CheckValidator
   */
  public static checkerParams(params: { [key: string]: string | undefined }): void {
    for (const [key, value] of Object.entries(params)) {
      if (!_.isString(value)) {
        console.log("key",key,"value",value);
        throw new Error("欄位未填寫正確")
      }
      switch (key) {
        case "nickName":
          if(!_.isString(value)){
            throw new Error("必須是 String")
          }
          if (!validator.isLength(value, { min: 2 })) {
            throw new Error("name 至少 2 個字以上")
          }
          break;
        case "sex":
          if(!_.isString(value)){
            throw new Error("必須是 String")
          }
          if (!["male", "female"].includes(value)) {
            throw new Error("sex 只能是 male 或是 female")
          }
          break;
        case "email":
          if(!_.isString(value)){
            throw new Error("必須是 String")
          }
          if (!validator.isEmail(value)) {
            throw new Error("Email 格式不對")
          }
          break;
        case "password":
          if(!_.isString(value)){
            throw new Error("必須是 String")
          }
          if (!validator.isLength(value, { min: 8 })) {
            throw new Error("密碼需要至少 8 碼以上")
          }
          if (validator.isAlpha(value)) {
            console.log("只有英字")
            throw new Error("密碼需要英數混和!")
          }
          if (validator.isNumeric(value)) {
            console.log("只有數字")
            throw new Error("密碼需要英數混和!")
          }
          if (validator.isStrongPassword(value, { returnScore: true }) <= 20) {
            throw new Error("密碼不夠強")
          }
          if (!validator.isLength(value, { min: 8 })) {
            throw new Error("密碼需要至少 8 碼以上")
          }
          break;
        case "content":
          if(!_.isString(value)){
            throw new Error("必須是 String")
          }
          break;
        case "imgURL":
          if(!_.isString(value)){
            throw new Error("必須是 String")
          }
          break;
      }
    }
  }
  public static comparePassword(params: { [key: string]: string | undefined }) {
    const { password, confirmPassword } = params
    if (!password) {
      throw new Error("格式不正確")
    }
    if (!confirmPassword) {
      throw new Error("格式不正確")
    }
    if (password !== confirmPassword) {
      throw new Error("密碼不一致")
    }
  }
}