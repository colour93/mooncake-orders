import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { sendOTP } from "@/services/otp";
import { OTPSendBody } from "@/types/packet/request/auth/OTP";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OTPSendBody;
    const result = await sendOTP(body.email);

    if (result) {
      return NextResponse.json({
        code: ResponseCode.SUCCESS,
        msg: "操作成功",
        data: {},
      });
    } else {
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "请检查您的邮箱或稍后再试",
        data: {},
      });
    }
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
