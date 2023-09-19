import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeMouldSeries } from "@/entities/MooncakeMouldSeries";

const mooncakeMouldSeriesRepository =
  AppDataSource.getRepository(MooncakeMouldSeries);

export async function GET() {
  try {
    const result = await mooncakeMouldSeriesRepository.find({
      relations: {
        activities: true,
      },
    });

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
