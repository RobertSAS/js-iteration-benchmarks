import { map } from "lodash";
import { AllTestResults, mapObjectKeys } from "../../testFunctions";

type resultType = string[];
export const mapObjectRunners: {
  [key: string]: (values: { [key: string]: number }) => resultType
} = {
  'fastMapObjectKey': (values: { [key: string]: number; }) => mapObjectKeys(values, (k, v) => `${ v }`),
  'lodash': (values: { [key: string]: number; }) => map(values, (v) => `${ v }`)
}

export const mapResults: AllTestResults = {};

