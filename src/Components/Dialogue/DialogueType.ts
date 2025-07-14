export interface choose {
  text: string;
  do: number;
  func?: boolean
}

export interface Dialogue {
  text: string;
  choose?: choose[];
}
