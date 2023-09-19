import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { MooncakeType } from "@/entities/MooncakeType";
import { databaseErrorHandler } from "@/utils/errorHandler";

const mooncakeTypeRepository = AppDataSource.getRepository(MooncakeType);

export async function GET() {
  try {
    const result = await mooncakeTypeRepository.find({
      relations: {
        activities: true,
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
