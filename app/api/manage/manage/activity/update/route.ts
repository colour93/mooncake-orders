import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import {
  ActivityUpdate,
  ActivityUpdateBody,
} from "@/types/packet/request/manage/activity";
import { AppDataSource } from "@/data-source";
import { Activity } from "@/entities/Activity";

const activityRepository = AppDataSource.getRepository(Activity);

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ActivityUpdateBody;

  try {
    const result = await activityRepository.update(
      { id: body.id },
      body as ActivityUpdate
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
    return NextResponse.json({
      code: ResponseCode.INTERNAL_SERVER_ERROR,
      msg: "未知错误",
      data: error,
    });
  }
}
