import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { User } from "@/entities/User";
import { UserAddBody, UserAdd } from "@/types/packet/request/manage/user/User";

const userRepository = AppDataSource.getRepository(User);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UserAddBody;
    const result = await userRepository.save(new UserAdd(body));
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
