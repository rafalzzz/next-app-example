export const parsePhoneNumber = (phoneNumber: string) =>
  phoneNumber.slice(1).replace(/ /g, "");
