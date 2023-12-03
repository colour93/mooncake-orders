export function checkEmail(email: string): boolean {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
    email
  );
}

export function checkUsername(nickname: string): boolean {
  return !/\s/.test(nickname);
}
