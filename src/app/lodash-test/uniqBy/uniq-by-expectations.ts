import { TestValueTypes } from "../../testFunctions";

type itemType = { i: number }
export const uniqByExpectations: TestValueTypes<itemType[], itemType[]> = {
  arrayTests: {
    'tiny (3 items)': {
      values: [[{ i: 123 }, { i: 234 }], [{ i: 123 }]],
      result: [{ i: 123 }, { i: 234 }]
    },
    'big (10000 items)': {
      values: [Array.from({ length: 10000 }).map((value, i) => ({ i: i })), Array.from({ length: 10000 }).map((value, i) => ({ i: i }))],
      result: Array.from({ length: 10000 }).map((value, i) => ({ i: i })).filter(value => value.i > 10)
    },
    'large (2000 items)': {
      values: [Array.from({ length: 2000 }).map((value, i) => ({ i: i })), Array.from({ length: 2000 }).map((value, i) => ({ i: i }))],
      result: Array.from({ length: 2000 }).map((value, i) => ({ i: i })).filter(value => value.i > 10)
    },
    'medium (500 items)': {
      values: [Array.from({ length: 500 }).map((value, i) => ({ i: i })), Array.from({ length: 500 }).map((value, i) => ({ i: i }))],
      result: Array.from({ length: 500 }).map((value, i) => ({ i: i })).filter(value => value.i > 10)
    },
    'small (100 items)': {
      values: [Array.from({ length: 100 }).map((value, i) => ({ i: i })), Array.from({ length: 100 }).map((value, i) => ({ i: i }))],
      result: Array.from({ length: 100 }).map((value, i) => ({ i: i })).filter(value => value.i > 10)
    }
  }
}
