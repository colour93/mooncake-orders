import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { Activity } from "@/entities/Activity";
import { databaseErrorHandler } from "@/utils/errorHandler";

const activityRepository = AppDataSource.getRepository(Activity);

export async function GET() {
  try {
    const result = await activityRepository.find();

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
