import { TestResults } from "../../testFunctions";
import { concat } from "lodash-es";

export const concatArrayRunners = {
  'spread operator': (values: number[][]) => {
    if (values.length === 5) {
      return [
        ...values[0],
        ...values[1],
        ...values[2],
        ...values[3],
        ...values[4]
      ]
    }
    return [
      ...values[0],
      ...values[1]
    ]
  },
  'lodash concat': (values: number[][]) => {
    if (values.length === 5) {
      return concat(values[0], values[1], values[2], values[3], values[4])
    }
    return concat(values[0], values[1])
  },
  'array concat': (values: number[][]) => {
    if (values.length === 5) {
      return values[0].concat(values[1], values[2], values[3], values[4])
    }
    return values[0].concat(values[1])
  }
}

export const concatResults: TestResults = {};

