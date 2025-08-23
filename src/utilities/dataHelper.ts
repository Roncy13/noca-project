import { isEmpty } from "lodash";

export const NotEmpty = (data: any) => !isEmpty(data);
export const CheckEmpty = (data: any) => isEmpty(data);
export const GetFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
}
