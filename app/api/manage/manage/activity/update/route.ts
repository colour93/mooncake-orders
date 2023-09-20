import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import {
  ActivityUpdate,
  ActivityUpdateBody,
} from "@/types/packet/request/manage/manage/Activity";
import { AppDataSource } from "@/data-source";
import { Activity } from "@/entities/Activity";
import { databaseErrorHandler } from "@/utils/errorHandler";

const activityRepository = AppDataSource.getRepository(Activity);

export async function POST(req: NextRequest) {
  
  try {
    const body = (await req.json()) as ActivityUpdateBody;
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
    return NextResponse.json(databaseErrorHandler(error));
  }
}
