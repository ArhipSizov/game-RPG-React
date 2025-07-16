export interface choose {
  text: string;
  do: number;
  func?: boolean
}

export interface DialogueType {
  text: string;
  choose?: choose[];
}
