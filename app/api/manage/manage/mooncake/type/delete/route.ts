import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { MooncakeType } from "@/entities/MooncakeType";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeTypeDeleteBody } from "@/types/packet/request/manage/manage/MooncakeType";

const mooncakeTypeRepository = AppDataSource.getRepository(MooncakeType);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as MooncakeTypeDeleteBody;

    const record = await mooncakeTypeRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await mooncakeTypeRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
