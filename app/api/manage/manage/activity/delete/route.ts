import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { Activity } from "@/entities/Activity";
import { ActivityDeleteBody } from "@/types/packet/request/manage/activity";

const activityRepository = AppDataSource.getRepository(Activity);

export async function POST(req: NextRequest) {
  const { id } = (await req.json()) as ActivityDeleteBody;

  try {
    const record = await activityRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await activityRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json({
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      msg: "未知错误",
      data: error,
    });
  }
}
