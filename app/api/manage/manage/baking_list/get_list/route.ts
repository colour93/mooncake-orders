import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { BakingList } from "@/entities/BakingList";

const bakingListRepository = AppDataSource.getRepository(BakingList);

export async function GET() {
  try {
    const result = await bakingListRepository.find({
      relations: {
        activity: true,
        mooncakeType: true,
        mooncakes: true,
      },
    });

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
