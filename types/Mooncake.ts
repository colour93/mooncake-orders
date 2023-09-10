export interface MooncakeType {
  typeId: number;
  typeName: string;
}

export interface MooncakeMould {
  mouldId: number;
  mouldName: string;
  seriesId: number;
  seriesName: string;
}

export interface MooncakeMouldSeries {
  seriesId: number;
  seriesName: string;
  moulds: {
    mouldId: number;
    mouldName: string;
  }[];
}

export interface MooncakeInfo {
  typeId: number;
  seriesId: number;
  mouldId: number;
}
