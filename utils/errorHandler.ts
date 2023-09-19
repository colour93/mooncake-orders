import { ResponseCode } from "@/types/packet/Response";

export function databaseErrorHandler(error: any) {
  switch (error.code) {
    case "ER_DUP_ENTRY":
      return {
        code: ResponseCode.CONFLICT,
        msg: "字段不唯一",
        data: {},
      };
    case "ER_BAD_NULL_ERROR":
      return {
        code: ResponseCode.BAD_REQUEST,
        msg: "请求参数不正确",
        data: {},
      };

    default:
      break;
  }
  if (error.message == "Unexpected end of JSON input") {
    return {
      code: ResponseCode.BAD_REQUEST,
      msg: "请求格式不正确",
      data: {},
    };
  }
  console.log(error);
  return {
    code: ResponseCode.INTERNAL_SERVER_ERROR,
    msg: "未知错误",
    data: error,
  };
}
