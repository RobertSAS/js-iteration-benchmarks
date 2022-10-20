import { TestValueTypes } from "../../testFunctions";
import { concat } from "lodash";

export const concatExpectations: TestValueTypes<Array<number>, number[]> = {
  arrayTests: {
    'small (3 items)': {
      values: [[1, 2, 3, 4], [5, 6, 7, 8]],
      result: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    'big (10000 items)': {
      values: [Array.from({ length: 10000 }).map((value, i) => i), Array.from({ length: 10000 }).map((value, i) => i)],
      result: concat(Array.from({ length: 10000 }).map((value, i) => i), Array.from({ length: 10000 }).map((value, i) => i))
    },
    '5 big arrays': {
      values: [
        Array.from({ length: 10000 }).map((value, i) => i),
        Array.from({ length: 10000 }).map((value, i) => i),
        Array.from({ length: 10000 }).map((value, i) => i),
        Array.from({ length: 10000 }).map((value, i) => i),
        Array.from({ length: 10000 }).map((value, i) => i),
      ],
      result: concat(
        Array.from({ length: 10000 }).map((value, i) => i),
        Array.from({ length: 10000 }).map((value, i) => i),
        Array.from({ length: 10000 }).map((value, i) => i),
        Array.from({ length: 10000 }).map((value, i) => i),
        Array.from({ length: 10000 }).map((value, i) => i)
      )
    },
    '5 small arrays': {
      values: [
        Array.from({ length: 3 }).map((value, i) => i),
        Array.from({ length: 3 }).map((value, i) => i),
        Array.from({ length: 3 }).map((value, i) => i),
        Array.from({ length: 3 }).map((value, i) => i),
        Array.from({ length: 3 }).map((value, i) => i)
      ],
      result: concat(
        Array.from({ length: 3 }).map((value, i) => i),
        Array.from({ length: 3 }).map((value, i) => i),
        Array.from({ length: 3 }).map((value, i) => i),
        Array.from({ length: 3 }).map((value, i) => i),
        Array.from({ length: 3 }).map((value, i) => i)
      )
    }
  }
}
