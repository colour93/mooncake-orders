export enum BakeStatus {
  CREATED = 1,
  PRINTED = 2,
  BAKING = 3,
  FINISHED = 4,
}

export interface BakeInfo {
  id: number;
  type: {
    id: number;
    name: string;
  };
  activity: {
    id: number;
    name: string;
  };
  status: number;
  count: number;
  created: number;
  baked?: number;
}

export class BakeInfoFormatted implements BakeInfo {
  id: number;
  type: { id: number; name: string };
  activity: { id: number; name: string };
  status: number;
  count: number;
  created: number;
  baked?: number;

  statusString: string;
  createdDate: Date;
  createdString: string;
  bakedDate?: Date;
  bakedString?: string;

  constructor({ id, type, activity, status, count, created, baked }: BakeInfo) {
    this.id = id;
    this.type = type;
    this.activity = activity;
    this.status = status;
    this.count = count;
    this.created = created;
    this.baked = baked;

    this.statusString = "未知状态";
    switch (this.status) {
      case BakeStatus.CREATED:
        this.statusString = "已创建";
        break;

      case BakeStatus.PRINTED:
        this.statusString = "已打印";
        break;

      case BakeStatus.BAKING:
        this.statusString = "烘焙中";
        break;

      case BakeStatus.FINISHED:
        this.statusString = "已完成";
        break;

      default:
        break;
    }

    this.createdDate = new Date(this.created);
    this.createdString = this.createdDate.toLocaleString();

    if (this.baked) {
      this.bakedDate = new Date(this.baked);
      this.bakedString = this.bakedDate.toLocaleString();
    }
  }
}

export interface BakeMooncakeInfo {}
