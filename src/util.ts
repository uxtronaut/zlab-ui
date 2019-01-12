import { reduce } from 'lodash';
import { camelizeKeys } from 'humps';

export function removeNamespace(namespace: string, types: any) {
  return reduce(types, (typeObj: any, typeValue: string, typeName: string) => {
    typeObj[typeName] = reduce(typeValue, (obj: any, v: string, k: number) => {
      obj[k] = v.replace(namespace, '');
      return obj;
    }, {});
    return typeObj;
  }, {});
}

export function parseUrlHash(str?: string) {
  if (str === undefined) { return {}; }
  const pieces = str.replace('#', '').split('&');
  const data: { [key: string]: string } = {};

  for (let i: number = 0; i < pieces.length; i += 1) {
    const parts = pieces[i].split('=');
    if (parts.length < 2) {
      parts.push('');
    }
    data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }
  return camelizeKeys(data);
}
