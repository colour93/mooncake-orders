import { NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { AppDataSource } from "@/data-source";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { Order } from "@/entities/Order";

const orderRepository = AppDataSource.getRepository(Order);

export async function GET() {
  try {
    const result = await orderRepository.find({
      relations: {
        activity: true,
        user: true,
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
