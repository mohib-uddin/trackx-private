const MEDIA_BASEURL = "http://13.48.67.109/uploads" as const;

export const getMedia = (uri: string) => {
  return `${MEDIA_BASEURL}${uri}`;
};
