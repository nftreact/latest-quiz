import { filterObject } from './filterObject'

export const createQueryString = (paramsObject: Record<string, unknown>) => {
  const filteredParams = filterObject(paramsObject)
  const params = new URLSearchParams(filteredParams)
  return params.toString()
}
