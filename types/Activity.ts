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