import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { MooncakeMould } from "@/entities/MooncakeMould";
import { MooncakeMouldDeleteBody } from "@/types/packet/request/manage/manage/MooncakeMould";

const mooncakeMouldRepository = AppDataSource.getRepository(MooncakeMould);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as MooncakeMouldDeleteBody;

    const record = await mooncakeMouldRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await mooncakeMouldRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
