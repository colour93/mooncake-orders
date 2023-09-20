import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeMould } from "@/entities/MooncakeMould";
import {
  MooncakeMouldAdd,
  MooncakeMouldAddBody,
} from "@/types/packet/request/manage/manage/MooncakeMould";
import { MooncakeMouldSeries } from "@/entities/MooncakeMouldSeries";

const mooncakeMouldSeriesRepository =
  AppDataSource.getRepository(MooncakeMouldSeries);
const mooncakeMouldRepository = AppDataSource.getRepository(MooncakeMould);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MooncakeMouldAddBody;

    const series = await mooncakeMouldSeriesRepository.findOneBy({
      id: body.seriesId,
    });

    if (!series) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到模具系列",
        data: {},
      });
    }

    const data = new MooncakeMouldAdd(body);
    data.series = series;

    const result = await mooncakeMouldRepository.save(data);
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
