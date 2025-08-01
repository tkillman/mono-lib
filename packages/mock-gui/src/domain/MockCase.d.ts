export type MockCase = {
  label: string;
  status: number;
  delay?: number;
  response:
    | string
    | number
    | null
    | undefined
    | Record<string, unknown>
    | Array<unknown>;
};
