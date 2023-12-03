import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { ActivateCode } from "@/entities/ActivateCode";
import { ActivateCodeDeleteBody } from "@/types/packet/request/manage/manage/ActivateCode";
import { databaseErrorHandler } from "@/utils/errorHandler";

const activateCodeRepository = AppDataSource.getRepository(ActivateCode);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as ActivateCodeDeleteBody;
    const record = await activateCodeRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await activateCodeRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
