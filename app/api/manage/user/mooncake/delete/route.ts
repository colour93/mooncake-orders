import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Mooncake } from "@/entities/Mooncake";
import { MooncakeDeleteBody } from "@/types/packet/request/manage/user/Mooncake";

const mooncakeRepository = AppDataSource.getRepository(Mooncake);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as MooncakeDeleteBody;
    const record = await mooncakeRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await mooncakeRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
