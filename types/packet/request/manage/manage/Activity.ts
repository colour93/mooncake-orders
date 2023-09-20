export interface ActivityAddBody {
  name: string;
  price?: number;
  endTime: number | string;
}

export class ActivityAdd {
  name: string;
  price?: number;
  endTime: Date;

  constructor({ name, price, endTime }: ActivityAddBody) {
    this.name = name;
    this.price = price;
    this.endTime = new Date(endTime);
  }
}

export interface ActivityDeleteBody {
  id: number;
}

export interface ActivityUpdateBody {
  id: number;
  name?: string;
  price?: number;
  endTime?: number | string;
}

export class ActivityUpdate {
  name?: string;
  price?: number;
  endTime?: Date;

  constructor({ name, price, endTime }: ActivityUpdateBody) {
    this.name = name;
    this.price = price;
    this.endTime = endTime ? new Date(endTime) : undefined;
  }
}
