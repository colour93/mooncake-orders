import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeMouldSeries } from "@/entities/MooncakeMouldSeries";
import {
  MooncakeMouldSeriesUpdate,
  MooncakeMouldSeriesUpdateBody,
} from "@/types/packet/request/manage/manage/MooncakeMouldSeries";
import { Activity } from "@/entities/Activity";

const activityRepository = AppDataSource.getRepository(Activity);
const mooncakeMouldSeriesRepository =
  AppDataSource.getRepository(MooncakeMouldSeries);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MooncakeMouldSeriesUpdateBody;

    let mooncakeMouldSeries = await mooncakeMouldSeriesRepository.findOneBy({
      id: body.id,
    });

    if (!mooncakeMouldSeries) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    const data = new MooncakeMouldSeriesUpdate(body);

    if (body.activityIds && body.activityIds.length != 0) {
      const activities = await Promise.all(
        body.activityIds.map(
          async (id) =>
            await activityRepository.findOneBy({
              id,
            })
        )
      );

      for (let i = 0; i < activities.length; i++) {
        if (!activities[i])
          return NextResponse.json({
            code: ResponseCode.NOT_FOUND,
            msg: "未找到活动",
            data: {
              id: body.activityIds[i],
            },
          });
      }

      data.activities = activities as Activity[];
    }

    mooncakeMouldSeries = Object.assign(mooncakeMouldSeries, data);

    const result = await mooncakeMouldSeriesRepository.save(
      mooncakeMouldSeries
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
