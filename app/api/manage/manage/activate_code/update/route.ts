import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import {
  ActivateCodeUpdate,
  ActivateCodeUpdateBody,
} from "@/types/packet/request/manage/manage/ActivateCode";
import { AppDataSource } from "@/data-source";
import { ActivateCode } from "@/entities/ActivateCode";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Activity } from "@/entities/Activity";

const activateCodeRepository = AppDataSource.getRepository(ActivateCode);
const activityRepository = AppDataSource.getRepository(Activity);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ActivateCodeUpdateBody;

    const activity = await activityRepository.findOneBy({
      id: body.activityId,
    });

    if (!activity) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到活动",
        data: {},
      });
    }

    if (activity.endTime.getTime() < new Date().getTime()) {
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "所对应活动已结束",
        data: {
          activity,
        },
      });
    }

    const result = await activateCodeRepository.update(
      { id: body.id },
      new ActivateCodeUpdate({ activity })
    );

    if (result.affected === 0) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
