export const convertISOToUnix = (isoString: string) => {
  return new Date(isoString).getTime();
};
