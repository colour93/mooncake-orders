import { MooncakeMouldSeries } from "@/entities/MooncakeMouldSeries";

export interface MooncakeMouldAddBody {
  name: string;
  image?: string;
  seriesId: number;
}

export class MooncakeMouldAdd {
  name: string;
  image?: string;
  series?: MooncakeMouldSeries;

  constructor({ name, image }: MooncakeMouldAddBody) {
    this.name = name;
    this.image = image;
  }
}

export interface MooncakeMouldDeleteBody {
  id: number;
}

export interface MooncakeMouldUpdateBody {
  id: number;
  name?: string;
  image?: string;
  seriesId?: number;
}

export class MooncakeMouldUpdate {
  name?: string;
  image?: string;
  series?: MooncakeMouldSeries | undefined;

  constructor({ name, image }: MooncakeMouldUpdateBody) {
    this.name = name;
    this.image = image;
  }
}
