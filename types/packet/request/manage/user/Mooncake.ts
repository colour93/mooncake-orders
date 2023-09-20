import { MooncakeStatus } from "@/entities/Mooncake";
import { MooncakeMould } from "@/entities/MooncakeMould";
import { MooncakeType } from "@/entities/MooncakeType";
import { Order } from "@/entities/Order";

export interface MooncakeAddBody {
  orderId: number;
  mooncakeTypeId: number;
  mooncakeMouldId: number;
}

export class MooncakeAdd {
  order!: Order;
  mooncakeType!: MooncakeType;
  mooncakeMould!: MooncakeMould;
}

export interface MooncakeDeleteBody {
  id: number;
}

export interface MooncakeUpdateBody {
  id: number;
  orderId?: number;
  mooncakeTypeId?: number;
  mooncakeMouldId?: number;
  status?: MooncakeStatus;
  bakedString?: string | number;
}

export class MooncakeUpdate {
  order?: Order;
  mooncakeType?: MooncakeType;
  mooncakeMould?: MooncakeMould;
  status?: MooncakeStatus;
  baked?: Date;

  constructor({ status, bakedString }: MooncakeUpdateBody) {
    this.status = status;
    if (bakedString) this.baked = new Date(bakedString);
  }
}
