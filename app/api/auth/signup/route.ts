import { NextRequest, NextResponse } from "next/server";
import { ResponseCode } from "@/types/packet/Response";
import { SignupBody } from "@/types/packet/request/auth/Signup";
import { databaseErrorHandler } from "@/utils/errorHandler";
import { AppDataSource } from "@/data-source";
import { ActivateCode } from "@/entities/ActivateCode";
import { checkEmail, checkUsername } from "@/utils/regex";
import { verifyOTP } from "@/services/otp";
import { User, UserRole } from "@/entities/User";
import { UserAdd } from "@/types/packet/request/manage/user/User";
import { OrderAdd } from "@/types/packet/request/manage/user/Ordet";
import { Order } from "@/entities/Order";
import { MooncakeAdd } from "@/types/packet/request/manage/user/Mooncake";
import { MooncakeType } from "@/entities/MooncakeType";
import { MooncakeMould } from "@/entities/MooncakeMould";
import { Mooncake } from "@/entities/Mooncake";

const activateCodeRepository = AppDataSource.getRepository(ActivateCode);
const userRepository = AppDataSource.getRepository(User);
const orderRepository = AppDataSource.getRepository(Order);
const mooncakeTypeRepository = AppDataSource.getRepository(MooncakeType);
const mooncakeMouldRepository = AppDataSource.getRepository(MooncakeMould);
const mooncakeRepository = AppDataSource.getRepository(Mooncake);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupBody;

    // 校验 activateCode
    const activateCode = await activateCodeRepository.findOne({
      relations: {
        activity: true,
      },
      where: {
        code: body.activateCode,
        used: false,
      },
    });

    if (!activateCode) {
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "激活码不存在或已被使用",
        data: {
          activateCode: body.activateCode,
        },
      });
    }

    if (activateCode.activity.endTime.getTime() < new Date().getTime()) {
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "激活码所对应活动已结束",
        data: {
          activateCode,
        },
      });
    }

    const { activity } = activateCode;

    // 注册用户
    if (!checkUsername(body.name)) {
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "用户名中不应包含空格",
        data: {
          name: body.name,
        },
      });
    }

    if (!checkEmail(body.email)) {
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "邮箱格式不正确",
        data: {
          name: body.name,
        },
      });
    }

    const otpStatus = await verifyOTP(body.email, body.otp);

    if (!otpStatus) {
      return NextResponse.json({
        code: ResponseCode.BAD_REQUEST,
        msg: "验证码不存在或已过期",
        data: {
          email: body.email,
          otp: body.otp,
        },
      });
    }

    const user = await userRepository.save(
      new UserAdd({ email: body.email, name: body.name, role: UserRole.COMMON })
    );

    // 创建订单

    const order = await orderRepository.save({
      deliveryAddress: body.deliveryAddress,
      deliveryName: body.deliveryName,
      deliveryPhone: body.deliveryPhone,
      activity: activity,
      user: user,
      freight: 15,
      price: activity.price,
    });

    // 创建月饼
    let mooncakes: MooncakeAdd[] = [];
    for (const { mooncakeMouldId, mooncakeTypeId } of body.mooncakes) {
      // type
      const mooncakeType = await mooncakeTypeRepository.findOne({
        relations: {
          activities: true,
        },
        where: {
          id: mooncakeTypeId,
        },
      });
      if (!mooncakeType)
        return NextResponse.json({
          code: ResponseCode.NOT_FOUND,
          msg: "未找到对应月饼口味",
          data: {
            id: mooncakeTypeId,
          },
        });
      if (!mooncakeType.activities?.map((v) => v.id).includes(activity.id))
        return NextResponse.json({
          code: ResponseCode.BAD_REQUEST,
          msg: "所选月饼口味与订单的活动 ID 不匹配",
          data: {},
        });

      // mould
      const mooncakeMould = await mooncakeMouldRepository.findOne({
        relations: {
          series: {
            activities: true,
          },
        },
        where: {
          id: mooncakeMouldId,
        },
      });
      if (!mooncakeMould)
        return NextResponse.json({
          code: ResponseCode.NOT_FOUND,
          msg: "未找到对应月饼模具",
          data: {
            id: mooncakeMouldId,
          },
        });
      if (
        !mooncakeMould.series.activities?.map((v) => v.id).includes(activity.id)
      )
        return NextResponse.json({
          code: ResponseCode.BAD_REQUEST,
          msg: "所选月饼模具与订单的活动 ID 不匹配",
          data: {},
        });

      mooncakes.push({
        order,
        mooncakeType,
        mooncakeMould,
      });
    }

    const mooncakesResult = await mooncakeRepository.save(mooncakes, {
      transaction: true,
    });

    activateCode.used = true;
    await activateCodeRepository.save(activateCode);

    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      msg: "操作成功",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(databaseErrorHandler(error));
  }
}
