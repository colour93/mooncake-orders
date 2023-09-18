import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";

export function POST(req: NextRequest) {
  return NextResponse.json({
    code: ResponseCode.SUCCESS,
    msg: "success",
    data: {},
  });
}
