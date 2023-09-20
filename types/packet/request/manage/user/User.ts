import { UserRole } from "@/entities/User";

export interface UserAddBody {
  name: string;
  email: string;
  role: UserRole;
}

export class UserAdd {
  name: string;
  email: string;
  role: UserRole;

  constructor({ name, email, role }: UserAddBody) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}

export interface UserDeleteBody {
  id: number;
}

export interface UserUpdateBody {
  id: number;
  name?: string;
  email?: string;
  role?: UserRole;
}

export class UserUpdate {
  name?: string;
  email?: string;
  role?: UserRole;

  constructor({ name, email, role }: UserUpdateBody) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
