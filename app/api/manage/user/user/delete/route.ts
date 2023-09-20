import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { User } from "@/entities/User";
import { UserDeleteBody } from "@/types/packet/request/manage/user/User";

const userRepository = AppDataSource.getRepository(User);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as UserDeleteBody;
    const record = await userRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await userRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
