import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeMouldSeries } from "@/entities/MooncakeMouldSeries";
import {
  MooncakeMouldSeriesUpdate,
  MooncakeMouldSeriesUpdateBody,
} from "@/types/packet/request/manage/MooncakeMouldSeries";
import { MooncakeMould } from "@/entities/MooncakeMould";
import {
  MooncakeMouldUpdate,
  MooncakeMouldUpdateBody,
} from "@/types/packet/request/manage/MooncakeMould";

const mooncakeMouldSeriesRepository =
  AppDataSource.getRepository(MooncakeMouldSeries);
const mooncakeMouldRepository = AppDataSource.getRepository(MooncakeMould);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MooncakeMouldUpdateBody;

    const data = new MooncakeMouldUpdate(body);

    if (body.seriesId) {
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

      data.series = series;
    }

    const result = await mooncakeMouldRepository.update({ id: body.id }, data);

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
