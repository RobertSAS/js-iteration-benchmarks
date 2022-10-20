import { TestValueTypes } from "../../testFunctions";

export const mapExpectations: TestValueTypes<{ [key: string]: number }, string[]> = {
  objectTests: {
    'small (3 keys)': {
      values: { a: 30310, b: 100303, c: 3040494 },
      result: ["30310", "100303", "3040494"]
    },
    'big (10000 keys)': {
      values: Array.from({ length: 10000 }).map((value, i) => i).reduce((val, v) => {
        // @ts-ignore
        val[v] = v
        return val
      }, {}),
      result: Array.from({ length: 10000 }).map((value, i) => `${ i }`)
    }
  }
}
