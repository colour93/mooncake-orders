export interface UserInfo {
  id: number;
  name: string;
  email: string;
  orderCount: number;
  created: number;
}

export class UserInfoFormatted implements UserInfo {
  id: number;
  name: string;
  email: string;
  orderCount: number;
  created: number;
  createdDate: Date;
  createdString: string;

  constructor(userInfo: UserInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.orderCount = userInfo.orderCount;
    this.created = userInfo.created;
    this.createdDate = new Date(this.created);
    this.createdString = this.createdDate.toLocaleString();
  }
}
