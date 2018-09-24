export interface Repository {
  id: string;
  nameAndAuthor: string;
  primaryLanguage?: string;
  latestTag?: string;
  url: string;
}
