import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeMould } from "@/entities/MooncakeMould";

const mooncakeMouldRepository = AppDataSource.getRepository(MooncakeMould);

export async function GET() {
  try {
    const result = await mooncakeMouldRepository.find({
      relations: {
        series: true,
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
