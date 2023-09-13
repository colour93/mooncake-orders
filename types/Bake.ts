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
}

export class BakeInfoFormatted implements BakeInfo {
  id: number;
  type: { id: number; name: string };
  activity: { id: number; name: string };
  status: number;
  count: number;
  created: number;

  statusString: string;
  createdDate: Date;
  createdString: string;

  constructor(bakeInfo: BakeInfo) {
    this.id = bakeInfo.id;
    this.type = bakeInfo.type;
    this.activity = bakeInfo.activity;
    this.status = bakeInfo.status;
    this.count = bakeInfo.count;
    this.created = bakeInfo.created;

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
  }
}

export interface BakeMooncakeInfo {
  id: number;
  activity: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  };
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
}
