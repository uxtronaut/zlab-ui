export interface Site {
  id: TemplateStringsArray;
  name: string;
  slug: string;
  environments: Environment[];
  errors?: { [index: string]: string[] };
}

export interface Environment {
  id: string;
  name: string;
  domain: string;
  publishedAt: string;
  savedAt: string;
  errors?: { [index: string]: string[] }
}

export interface SitesState {
  list: Site[];
  newSite: Site | undefined;
  newEnvironment: Environment | undefined;
  currentSiteSlug: string | undefined;
}
