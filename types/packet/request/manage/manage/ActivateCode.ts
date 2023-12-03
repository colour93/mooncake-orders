import { Activity } from "@/entities/Activity";
import { nanoid } from "nanoid";

export interface ActivateCodeGenerateBody {
  activityId: number;
}

export class ActivateCodeGenerate {
  code: string;
  activity: Activity;

  constructor({ activity }: { activity: Activity }) {
    this.code = nanoid();
    this.activity = activity;
  }
}

export interface ActivateCodeDeleteBody {
  id: number;
}

export interface ActivateCodeUpdateBody {
  id: number;
  activityId: number;
}

export class ActivateCodeUpdate {
  activity: Activity;

  constructor({ activity }: { activity: Activity }) {
    this.activity = activity;
  }
}
