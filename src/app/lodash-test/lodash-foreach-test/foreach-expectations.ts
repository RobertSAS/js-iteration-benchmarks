import { TestValueTypes } from "../../testFunctions";

export const foreachExpectations: TestValueTypes<{ [key: string]: number }, number> = {
  objectTests: {
    'tiny (3 keys)': {
      values: { a: 30310, b: 100303, c: 3040494 },
      result: 3171107
    },
    'big (10000 keys)': {
      values: Array.from({ length: 10000 }).map((value, i) => i).reduce((val, v) => {
        // @ts-ignore
        val[v] = v
        return val
      }, {}),
      result: 49995000
    }
  }, arrayTests: {
    'tiny (3 items)': {
      values: [{ i: 30310 }, { i: 100303 }, { i: 3040494 }],
      result: 3171107
    },
    'big (10000 items)': {
      values: Array.from({ length: 10000 }).map((value, i) => ({ i: i })),
      result: 49995000
    },
    'large (2000 items)': {
      values: Array.from({ length: 2000 }).map((value, i) => ({ i: i })),
      result: 1999000
    },
    'medium (500 items)': {
      values: Array.from({ length: 500 }).map((value, i) => ({ i: i })),
      result: 124750
    },
    'small (100 items)': {
      values: Array.from({ length: 100 }).map((value, i) => ({ i: i })),
      result: 4950
    }
  }
}
