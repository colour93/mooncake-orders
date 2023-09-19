import { Activity } from "@/entities/Activity";

export interface MooncakeTypeAddBody {
  name: string;
  link?: string;
  activityIds?: number[];
}

export class MooncakeTypeAdd {
  name: string;
  link?: string | undefined;
  activities?: Activity[];

  constructor({ name, link }: MooncakeTypeAddBody) {
    this.name = name;
    this.link = link;
  }
}

export interface MooncakeTypeDeleteBody {
  id: number;
}

export interface MooncakeTypeUpdateBody {
  id: number;
  name?: string;
  link?: string;
  activityIds?: number[];
}

export class MooncakeTypeUpdate {
  name?: string;
  link?: string | undefined;
  activities?: Activity[];

  constructor({ name, link }: MooncakeTypeUpdateBody) {
    this.name = name;
    this.link = link;
  }
}
