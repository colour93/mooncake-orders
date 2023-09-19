import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeType } from "@/entities/MooncakeType";
import { Activity } from "@/entities/Activity";
import { BakingListPrintBody } from "@/types/packet/request/manage/BakingList";
import { Mooncake, MooncakeStatus } from "@/entities/Mooncake";
import { BakingList } from "@/entities/BakingList";

const mooncakeRepository = AppDataSource.getRepository(Mooncake);
const bakingListRepository = AppDataSource.getRepository(BakingList);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as BakingListPrintBody;

    const record = await bakingListRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    const result = await mooncakeRepository
      .createQueryBuilder()
      .update(Mooncake)
      .set({ status: MooncakeStatus.PRINTED })
      .where("bakingListId = :bakingListId", { bakingListId: id })
      .execute();

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
