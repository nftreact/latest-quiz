export const filterObject = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => (value !== undefined && value !== '' && value !== null && key === 'aid') || key === 'type',
    ),
  )
}
