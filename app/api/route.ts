import { NextResponse } from "next/server";
import packageJson from "@/package.json";
import { ResponseCode } from "@/types/packet/Response";

export function GET() {
  return NextResponse.json({
    code: ResponseCode.SUCCESS,
    msg: "操作成功",
    data: {
      version: packageJson.version,
    },
  });
}
