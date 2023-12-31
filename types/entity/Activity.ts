export enum ActivityStatus {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  FINISHED = 3,
}

export interface ActivityInfo {
  id: number;
  name: string;
  status: number;
  orderCount: number;
  startTime: number;
  upToTime: number;
}

export class ActivityInfoFormatted implements ActivityInfo {
  id: number;
  name: string;
  status: number;
  orderCount: number;
  startTime: number;
  upToTime: number;

  statusString: string;
  startTimeDate: Date;
  startTimeString: string;
  upToTimeDate: Date;
  upToTimeString: string;

  constructor({
    id,
    name,
    status,
    orderCount,
    startTime,
    upToTime,
  }: ActivityInfo) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.orderCount = orderCount;
    this.startTime = startTime;
    this.upToTime = upToTime;

    this.statusString = "未知状态";
    switch (this.status) {
      case ActivityStatus.NOT_STARTED:
        this.statusString = "未开始";
        break;
      case ActivityStatus.IN_PROGRESS:
        this.statusString = "进行中";
        break;
      case ActivityStatus.FINISHED:
        this.statusString = "已截止";
        break;
      default:
        break;
    }

    this.startTimeDate = new Date(this.startTime);
    this.startTimeString = this.startTimeDate.toLocaleString();
    this.upToTimeDate = new Date(this.upToTime);
    this.upToTimeString = this.upToTimeDate.toLocaleString();
  }
}
