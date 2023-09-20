import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { BakingList } from "@/entities/BakingList";
import { BakingListDeleteBody } from "@/types/packet/request/manage/manage/BakingList";

const bakingListRepository = AppDataSource.getRepository(BakingList);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as BakingListDeleteBody;

    const record = await bakingListRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await bakingListRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
