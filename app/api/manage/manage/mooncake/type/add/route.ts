import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { MooncakeType } from "@/entities/MooncakeType";
import {
  MooncakeTypeAdd,
  MooncakeTypeAddBody,
} from "@/types/packet/request/manage/MooncakeType";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Activity } from "@/entities/Activity";

const activityRepository = AppDataSource.getRepository(Activity);
const mooncakeTypeRepository = AppDataSource.getRepository(MooncakeType);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MooncakeTypeAddBody;

    const data = new MooncakeTypeAdd(body);

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

    const result = await mooncakeTypeRepository.save(data);
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
