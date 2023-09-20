import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { Activity } from "@/entities/Activity";
import {
  ActivityAdd,
  ActivityAddBody,
} from "@/types/packet/request/manage/manage/Activity";
import { databaseErrorHandler } from "@/utils/errorHandler";

const activityRepository = AppDataSource.getRepository(Activity);

export async function POST(req: NextRequest) {
  
  try {
    const body = (await req.json()) as ActivityAddBody;
    const result = await activityRepository.save(new ActivityAdd(body));
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
