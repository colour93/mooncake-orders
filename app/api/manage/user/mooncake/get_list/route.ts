import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Mooncake } from "@/entities/Mooncake";

const mooncakeRepository = AppDataSource.getRepository(Mooncake);

export async function GET() {
  try {
    const result = await mooncakeRepository.find({
      relations: {
        order: true,
        mooncakeMould: {
          series: true,
        },
        mooncakeType: true,
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
