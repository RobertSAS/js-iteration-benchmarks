import { each, forEach } from "lodash";
import { forEachObjectKey, TestResults } from "../../testFunctions";

export const lodashObjectRunners = {
  'fastForEachObjectKey': (values: { [key: string]: number; }) => {
    let count = 0
    forEachObjectKey(values, (k, v) => {
      count += v
    })
    return count;
  },
  'lodash.each': (values: { [key: string]: number; }) => {
    let count = 0
    each(values, (v) => {
      count += v
    })
    return count
  },
  'Object.entries': (values: { [key: string]: number; }) => {
    let count = 0
    for (const [_, value] of Object.entries(values)) {
      count += value;
    }
    return count
  },
  'for key in values': (values: { [key: string]: number; }) => {
    let count = 0
    for (const key in values) {
      count += values[key];
    }
    return count
  }
}
export const lodashArrayRunners = {
  'array-iterate': (values: { i: number; }[]) => {
    let count = 0
    for (const value of values) {
      count += value.i
    }
    return count
  },
  'lodash': (values: { i: number; }[]) => {
    let count = 0
    each(values, (v) => {
      count += v.i
    })
    return count
  },
  'array-foreach': (values: { i: number; }[]) => {
    let count = 0
    values.forEach((v) => {
      count += v.i
    })
    return count
  },
  'lodash.forEach': (values: { i: number; }[]) => {
    let count = 0
    forEach(values, (v) => {
      count += v.i
    })
    return count
  },
}

export const foreachResults: TestResults = {};

