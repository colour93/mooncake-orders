import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { Activity } from "@/entities/Activity";
import {
  ActivityAdd,
  ActivityAddBody,
} from "@/types/packet/request/manage/activity";

const activityRepository = AppDataSource.getRepository(Activity);

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ActivityAddBody;

  try {
    const result = await activityRepository.save(new ActivityAdd(body));
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    if (error.code == "ER_DUP_ENTRY") {
      return NextResponse.json({
        code: ResponseCode.CONFLICT,
        msg: "字段不唯一",
        data: error,
      });
    }
    return NextResponse.json({
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      msg: "未知错误",
      data: error,
    });
  }
}
