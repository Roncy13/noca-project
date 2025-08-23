/**
 * For Typeorm use
 * import { GetConnection } from '@config/database';
 * const model = GetConnection( Put Your Typeorm Schema Here);
 * export function UserAllSrv() {
 *   return model.find();
 * }
 */

export async function GetUserAll() {
  const result = await new Promise((resolve) => {
    setTimeout(
      () => resolve([{ name: 'namess'}, { name: 'tesdasa'}]),
    3000)
  });

  return result;
}