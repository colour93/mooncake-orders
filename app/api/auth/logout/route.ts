import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";

export function GET() {
  return NextResponse.json({
    code: ResponseCode.SUCCESS,
    msg: "success",
    data: {},
  });
}
