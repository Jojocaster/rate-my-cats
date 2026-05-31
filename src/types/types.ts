export interface CatImage {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
  favourite?: {
    id: number;
  };
  vote?: any;
}
