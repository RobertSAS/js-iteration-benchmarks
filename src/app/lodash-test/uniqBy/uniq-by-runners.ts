import { filterArrayByUnique, TestResults } from "../../testFunctions";
import { uniqBy } from "lodash-es";

export const uniqByArrayRunners = {
  'set and for loop': (values: { i: number }[][]) => {
    return filterArrayByUnique(values[0].concat(
      values[1]
    ), 'i', (value => value.i > 10))
  },
  'lodash uniqby': (values: { i: number }[][]) => {
    return uniqBy(values[0].concat(values[1]), 'i').filter(value => value.i > 10)
  }
}

export const uniqByResults: TestResults = {};
