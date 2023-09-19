import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeMouldSeries } from "@/entities/MooncakeMouldSeries";
import { MooncakeMouldSeriesDeleteBody } from "@/types/packet/request/manage/MooncakeMouldSeries";

const mooncakeMouldSeriesRepository =
  AppDataSource.getRepository(MooncakeMouldSeries);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as MooncakeMouldSeriesDeleteBody;

    const record = await mooncakeMouldSeriesRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await mooncakeMouldSeriesRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
