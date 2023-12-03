import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { ActivateCode } from "@/entities/ActivateCode";
import {
  ActivateCodeGenerate,
  ActivateCodeGenerateBody,
} from "@/types/packet/request/manage/manage/ActivateCode";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Activity } from "@/entities/Activity";

const activityRepository = AppDataSource.getRepository(Activity);
const activateCodeRepository = AppDataSource.getRepository(ActivateCode);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ActivateCodeGenerateBody;

    const activity = await activityRepository.findOneBy({
      id: body.activityId,
    });

    if (!activity) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到对应活动",
        data: {
          activityId: body.activityId,
        },
      });
    }

    if (activity.endTime.getTime() < new Date().getTime()) {
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "该活动已结束",
        data: {
          activity,
        },
      });
    }

    const result = await activateCodeRepository.save(
      new ActivateCodeGenerate({ activity })
    );

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
