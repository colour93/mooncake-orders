import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { ActivateCode } from "@/entities/ActivateCode";
import { databaseErrorHandler } from "@/utils/errorHandler";

const activateCodeRepository = AppDataSource.getRepository(ActivateCode);

export async function GET() {
  try {
    const result = await activateCodeRepository.find({
      relations: {
        activity: true,
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
