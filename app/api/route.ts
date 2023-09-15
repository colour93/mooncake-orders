import { NextResponse } from "next/server";
import packageJson from "@/package.json";
import { ResponseCode } from "@/types/packet/Response";

export function GET() {
  return NextResponse.json({
    code: ResponseCode.SUCCESS,
    msg: "success",
    data: {
      version: packageJson.version,
    },
  });
}
