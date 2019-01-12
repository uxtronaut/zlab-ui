export interface Site {
  _id: number,
  name: string,
  domain: string,
  slug: string,
  publishedAt: string,
  savedAt: string,
  errors: { [index: string]: string[] }
}

export interface SitesState {
  list: Site[],
  newSite: Site | undefined,
  currentSiteSlug: string | undefined,
}
