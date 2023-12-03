export interface SignupBody {
  name: string;
  email: string;
  otp: string;
  activateCode: string;
  mooncakes: {
    mooncakeTypeId: number;
    mooncakeMouldId: number;
  }[];
  deliveryName: string;
  deliveryPhone: number;
  deliveryAddress: string;
}
