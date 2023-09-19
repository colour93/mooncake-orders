import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { MooncakeType } from "@/entities/MooncakeType";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Activity } from "@/entities/Activity";
import { Mooncake } from "@/entities/Mooncake";
import { BakingList } from "@/entities/BakingList";
import {
  BakingListGenerate,
  BakingListGenerateBody,
} from "@/types/packet/request/manage/BakingList";
import { findNullIndexes } from "@/utils/utils";

const activityRepository = AppDataSource.getRepository(Activity);
const mooncakeTypeRepository = AppDataSource.getRepository(MooncakeType);
const mooncakeRepository = AppDataSource.getRepository(Mooncake);
const bakingListRepository = AppDataSource.getRepository(BakingList);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BakingListGenerateBody;

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

    const data = new BakingListGenerate({ activity, mooncakeType });

    // mooncakes
    const count = body.count || 15;

    const mooncakes = await mooncakeRepository
      .createQueryBuilder("mooncake")
      .leftJoin("mooncake.order", "order")
      .where("mooncake.activityId = :activityId", { activityId: activity.id })
      .andWhere("mooncake.mooncakeTypeId = :mooncakeTypeId", {
        mooncakeTypeId: mooncakeType.id,
      })
      .andWhere(
        "(mooncake.bakingList IS NULL OR mooncake.bakingList = :bakingList)",
        { bakingList: null }
      )
      .andWhere("order.isPaid = :isPaid", { isPaid: true })
      .take(count)
      .getMany();

    if (mooncakes.length == 0)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "没有符合条件的月饼",
        data: {},
      });

    data.mooncakes = mooncakes;

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
