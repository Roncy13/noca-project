import { createClient } from 'redis'
const client = createClient();

export function setRedis(key: string, value: any) {
  return client.set(key,JSON.stringify(value));
}

export function getRedis(key: string) {
  return new Promise((resolve) => {
    client.get(key, (err, val) => {
      return resolve(JSON.parse(val))
    })
  })
}
