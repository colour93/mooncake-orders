import { Activity } from "@/entities/Activity";
import { OrderStatus } from "@/entities/Order";
import { User } from "@/entities/User";

export interface OrderAddBody {
  userId: number;
  activityId: number;
  deliveryPhone: number;
  deliveryAddress: string;
  deliveryName: string;
  deliveryId?: string;
}

export class OrderAdd {
  user!: User;
  activity!: Activity;
  deliveryPhone: number;
  deliveryAddress: string;
  deliveryName: string;
  deliveryId?: string;

  constructor({
    deliveryAddress,
    deliveryName,
    deliveryPhone,
    deliveryId,
  }: OrderAddBody) {
    this.deliveryAddress = deliveryAddress;
    this.deliveryId = deliveryId;
    this.deliveryName = deliveryName;
    this.deliveryPhone = deliveryPhone;
  }
}

export interface OrderDeleteBody {
  id: number;
}

export interface OrderUpdateBody {
  id: number;
  deliveryPhone?: number;
  deliveryAddress?: string;
  deliveryName?: string;
  deliveryId?: string;
  status?: OrderStatus;
  freight?: number;
  price?: number;
  isPaid?: boolean;
}

export class OrderUpdate {
  deliveryPhone?: number;
  deliveryAddress?: string;
  deliveryName?: string;
  deliveryId?: string;
  status?: OrderStatus;
  freight?: number;
  price?: number;
  isPaid?: boolean;

  constructor({
    deliveryAddress,
    deliveryName,
    deliveryPhone,
    deliveryId,
    status,
    freight,
    price,
    isPaid,
  }: OrderUpdateBody) {
    this.deliveryAddress = deliveryAddress;
    this.deliveryId = deliveryId;
    this.deliveryName = deliveryName;
    this.deliveryPhone = deliveryPhone;
    this.status = status;
    this.freight = freight;
    this.price = price;
    this.isPaid = isPaid;
  }
}
