import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { User } from "@/entities/User";
import {
  UserUpdate,
  UserUpdateBody,
} from "@/types/packet/request/manage/user/User";

const userRepository = AppDataSource.getRepository(User);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UserUpdateBody;
    const result = await userRepository.update(
      { id: body.id },
      new UserUpdate(body)
    );

    if (result.affected === 0) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
