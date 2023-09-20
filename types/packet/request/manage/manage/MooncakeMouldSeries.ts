import { Activity } from "@/entities/Activity";

export interface MooncakeMouldSeriesAddBody {
  name: string;
  activityIds?: number[];
}

export class MooncakeMouldSeriesAdd {
  name: string;
  activities?: Activity[];

  constructor({ name }: MooncakeMouldSeriesAddBody) {
    this.name = name;
  }
}

export interface MooncakeMouldSeriesDeleteBody {
  id: number;
}

export interface MooncakeMouldSeriesUpdateBody {
  id: number;
  name?: string;
  activityIds?: number[];
}

export class MooncakeMouldSeriesUpdate {
  name?: string;
  activities?: Activity[];

  constructor({ name }: MooncakeMouldSeriesUpdateBody) {
    this.name = name;
  }
}
