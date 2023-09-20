import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { Activity } from "@/entities/Activity";
import { ActivityDeleteBody } from "@/types/packet/request/manage/manage/Activity";
import { databaseErrorHandler } from "@/utils/errorHandler";

const activityRepository = AppDataSource.getRepository(Activity);

export async function POST(req: NextRequest) {
  
  try {
    const { id } = (await req.json()) as ActivityDeleteBody;
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
    return NextResponse.json(databaseErrorHandler(error));
  }
}
