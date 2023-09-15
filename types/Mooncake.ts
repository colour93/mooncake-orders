import { ActivityInfo } from "./Activity";

enum MooncakeStatus {
  CREATED = 1,
  PRINTED = 2,
  BAKING = 3,
  BAKED = 4,
  PACKAGED = 5,
}

export interface SignupMooncakeType {
  typeId: number;
  typeName: string;
}

export interface SignupMooncakeMould {
  mouldId: number;
  mouldName: string;
  mouldImage: string;
  seriesId: number;
  seriesName: string;
}

export interface SignupMooncakeMouldSeries {
  seriesId: number;
  seriesName: string;
  moulds: {
    mouldId: number;
    mouldName: string;
  }[];
}

export interface SignupMooncakeInfo {
  typeId: number;
  seriesId: number;
  mouldId: number;
}

export interface MooncakeInfo {
  id: number;
  activity: ActivityInfo;
  type: {
    id: number;
    name: string;
  };
  mould: {
    id: number;
    name: string;
    series: {
      id: number;
      name: string;
    };
  };
  status: MooncakeStatus;
  baked?: number;
}

export class MooncakeInfoFormatted implements MooncakeInfo {
  id: number;
  activity: ActivityInfo;
  type: { id: number; name: string };
  mould: { id: number; name: string; series: { id: number; name: string } };
  status: MooncakeStatus;
  baked?: number | undefined;

  statusString: string;
  bakedDate?: Date;
  bakedString?: string;

  constructor({ id, activity, type, mould, status, baked }: MooncakeInfo) {
    this.id = id;
    this.activity = activity;
    this.type = type;
    this.mould = mould;
    this.status = status;
    this.baked = baked;

    switch (this.status) {
      case MooncakeStatus.CREATED:
        this.statusString = "已创建";
        break;

      case MooncakeStatus.PRINTED:
        this.statusString = "已打印";
        break;

      case MooncakeStatus.BAKING:
        this.statusString = "烘焙中";
        break;

      case MooncakeStatus.BAKED:
        this.statusString = "已烘焙";
        break;

      case MooncakeStatus.PACKAGED:
        this.statusString = "已包装";
        break;

      default:
        this.statusString = "未知状态: " + this.status;
        break;
    }

    if (this.baked) {
      this.bakedDate = new Date(this.baked);
      this.bakedString = this.bakedDate.toLocaleString();
    }
  }
}
