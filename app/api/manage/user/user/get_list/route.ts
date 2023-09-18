import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";

export function GET() {
  return NextResponse.json({
    code: ResponseCode.SUCCESS,
    msg: "操作成功",
    data: {},
  });
}
