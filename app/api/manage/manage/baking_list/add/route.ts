import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { MooncakeType } from "@/entities/MooncakeType";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Activity } from "@/entities/Activity";
import { Mooncake } from "@/entities/Mooncake";
import { BakingList } from "@/entities/BakingList";
import {
  BakingListAdd,
  BakingListAddBody,
} from "@/types/packet/request/manage/manage/BakingList";
import { findNullIndexes } from "@/utils/utils";

const activityRepository = AppDataSource.getRepository(Activity);
const mooncakeTypeRepository = AppDataSource.getRepository(MooncakeType);
const mooncakeRepository = AppDataSource.getRepository(Mooncake);
const bakingListRepository = AppDataSource.getRepository(BakingList);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BakingListAddBody;

    // activity
    const activity = await activityRepository.findOneBy({
      id: body.activityId,
    });
    if (!activity)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到活动",
        data: {
          activityId: body.activityId,
        },
      });

    // mooncakeType
    const mooncakeType = await mooncakeTypeRepository.findOneBy({
      id: body.mooncakeTypeId,
    });
    if (!mooncakeType)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到月饼口味",
        data: {
          mooncakeTypeId: body.mooncakeTypeId,
        },
      });

    const data = new BakingListAdd({ activity, mooncakeType });

    // mooncakes
    if (body.mooncakeIds && body.mooncakeIds.length != 0) {
      const mooncakes = await Promise.all(
        body.mooncakeIds.map(
          async (id) =>
            await mooncakeRepository.findOneBy({
              id,
            })
        )
      );

      const nullIndexes = findNullIndexes(mooncakes);
      if (nullIndexes.length != 0)
        return NextResponse.json({
          code: ResponseCode.NOT_FOUND,
          msg: "未找到月饼",
          data: {
            id: nullIndexes.map((index) => body.mooncakeIds![index]),
          },
        });

      data.mooncakes = mooncakes as Mooncake[];
    }

    const result = await bakingListRepository.save(data);
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
