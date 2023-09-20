import { Activity } from "@/entities/Activity";
import { Mooncake } from "@/entities/Mooncake";
import { MooncakeType } from "@/entities/MooncakeType";

export interface BakingListAddBody {
  activityId: number;
  mooncakeTypeId: number;
  mooncakeIds?: number[];
}

export class BakingListAdd {
  activity!: Activity;
  mooncakeType!: MooncakeType;
  mooncakes?: Mooncake[];

  constructor({ activity, mooncakeType }: BakingListAdd) {
    this.activity = activity;
    this.mooncakeType = mooncakeType;
  }
}

export interface BakingListDeleteBody {
  id: number;
}

export interface BakingListUpdateBody {
  id: number;
  activityId?: number;
  mooncakeTypeId?: number;
  mooncakeIds?: number[];
}

export class BakingListUpdate {
  activity?: Activity;
  mooncakeType?: MooncakeType;
  mooncakes?: Mooncake[];

  constructor({ activity, mooncakeType, mooncakes }: BakingListUpdate) {
    this.activity = activity;
    this.mooncakeType = mooncakeType;
    this.mooncakes = mooncakes;
  }
}

export interface BakingListGenerateBody {
  activityId: number;
  mooncakeTypeId: number;
  count?: number;
}

export class BakingListGenerate extends BakingListUpdate {}

export interface BakingListPrintBody {
  id: number;
}
