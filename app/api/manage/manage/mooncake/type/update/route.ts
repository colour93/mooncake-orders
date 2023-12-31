import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeType } from "@/entities/MooncakeType";
import {
  MooncakeTypeUpdate,
  MooncakeTypeUpdateBody,
} from "@/types/packet/request/manage/manage/MooncakeType";
import { Activity } from "@/entities/Activity";
import { findNullIndexes } from "@/utils/utils";

const activityRepository = AppDataSource.getRepository(Activity);
const mooncakeMouldSeriesRepository = AppDataSource.getRepository(MooncakeType);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MooncakeTypeUpdateBody;

    const data = new MooncakeTypeUpdate(body);

    if (body.activityIds && body.activityIds.length != 0) {
      const activities = await Promise.all(
        body.activityIds.map(
          async (id) =>
            await activityRepository.findOneBy({
              id,
            })
        )
      );

      const nullIndexes = findNullIndexes(activities);
      if (nullIndexes.length != 0)
        return NextResponse.json({
          code: ResponseCode.NOT_FOUND,
          msg: "未找到活动",
          data: {
            id: nullIndexes.map((index) => body.activityIds![index]),
          },
        });

      data.activities = activities as Activity[];
    }

    const result = await mooncakeMouldSeriesRepository.update(
      { id: body.id },
      data
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
