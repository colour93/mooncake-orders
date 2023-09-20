import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Order } from "@/entities/Order";
import { OrderDeleteBody } from "@/types/packet/request/manage/user/Ordet";

const orderRepository = AppDataSource.getRepository(Order);

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as OrderDeleteBody;
    const record = await orderRepository.findOneBy({ id });

    if (!record) {
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: {},
      });
    }

    await orderRepository.remove(record);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
