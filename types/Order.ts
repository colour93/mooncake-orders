import { ActivityInfo, ActivityInfoFormatted } from "./Activity";
import { MooncakeInfo, MooncakeInfoFormatted } from "./Mooncake";
import { UserInfo } from "./User";

enum OrderStatus {
  CREATED = 1,
  BAKING = 2,
  PACKAGED = 3,
  DELIVERING = 4,
  DONE = 5,
}

export interface OrderInfo {
  id: number;
  user: UserInfo;
  activity: ActivityInfo;
  status: OrderStatus;
  mooncakes: MooncakeInfo[];
  deliveryName: string;
  deliveryPhone: number;
  deliveryAddress: string;
  deliveryId?: string;
  freight: number;
  price: number;
  cost: number;
  isPayed: boolean;
  created: number;
  updated: number;
}

export class OrderInfoFormatted implements OrderInfo {
  id: number;
  user: UserInfo;
  activity: ActivityInfo;
  status: OrderStatus;
  mooncakes: MooncakeInfo[];
  deliveryName: string;
  deliveryPhone: number;
  deliveryAddress: string;
  deliveryId?: string | undefined;
  freight: number;
  price: number;
  cost: number;
  isPayed: boolean;
  created: number;
  updated: number;

  activityFormatted: ActivityInfoFormatted;
  mooncakesFormatted: MooncakeInfoFormatted[];
  statusString: string;
  createdDate: Date;
  createdString: string;
  updatedDate: Date;
  updatedString: string;

  constructor({
    id,
    user,
    activity,
    status,
    mooncakes,
    deliveryName,
    deliveryPhone,
    deliveryAddress,
    deliveryId,
    freight,
    price,
    cost,
    isPayed,
    created,
    updated,
  }: OrderInfo) {
    this.id = id;
    this.user = user;
    this.activity = activity;
    this.status = status;
    this.mooncakes = mooncakes;
    this.deliveryName = deliveryName;
    this.deliveryPhone = deliveryPhone;
    this.deliveryAddress = deliveryAddress;
    this.deliveryId = deliveryId;
    this.freight = freight;
    this.price = price;
    this.cost = cost;
    this.isPayed = isPayed;
    this.created = created;
    this.updated = updated;

    this.mooncakesFormatted = this.mooncakes.map(
      (v) => new MooncakeInfoFormatted(v)
    );

    this.activityFormatted = new ActivityInfoFormatted(this.activity);

    switch (this.status) {
      case OrderStatus.CREATED:
        this.statusString = "已创建";
        break;

      case OrderStatus.BAKING:
        this.statusString = "烘焙中";
        break;

      case OrderStatus.PACKAGED:
        this.statusString = "已包装";
        break;

      case OrderStatus.DELIVERING:
        this.statusString = "运输中";
        break;

      case OrderStatus.DONE:
        this.statusString = "已完成";
        break;

      default:
        this.statusString = "未知状态: " + this.status;
        break;
    }

    this.createdDate = new Date(this.created);
    this.createdString = this.createdDate.toLocaleString();

    this.updatedDate = new Date(this.updated);
    this.updatedString = this.updatedDate.toLocaleString();
  }
}
