import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Order } from "@/entities/Order";
import {
  OrderUpdate,
  OrderUpdateBody,
} from "@/types/packet/request/manage/user/Ordet";

const orderRepository = AppDataSource.getRepository(Order);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderUpdateBody;

    const raw = await orderRepository.findOneBy({ id: body.id });
    if (!raw)
      return NextResponse.json({
        code: ResponseCode.NOT_FOUND,
        msg: "未找到记录",
        data: { id: body.id },
      });

    const data = {
      ...raw,
      ...new OrderUpdate(body),
    };

    const result = await orderRepository.save(data);
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
