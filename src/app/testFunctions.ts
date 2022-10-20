// this essentially copies how lodash runs object iteration

export const forEachObjectKey = <T>(object: T, toRun: (key: string, value: T[keyof T]) => void) => {
  const keys = Object.keys(object)
  let length = keys.length
  let index = -1
  while (length--) {
    index++
    toRun(keys[index], (object as T)[keys[index] as keyof T])
  }
}

export const mapObjectKeys = <T, T2>(object: T, toRun: (key: string, value: T[keyof T]) => T2) => {
  const returnObject = new Array<T2>();
  const keys = Object.keys(object);
  let length = keys.length;
  let index = -1;
  while (length--) {
    index++;
    returnObject.push(toRun(keys[index], (object as T)[keys[index] as keyof T]));
  }
  return returnObject;
};

export const filterArrayByUnique = <T>(array: T[], property: keyof T, filterFn?: ((item: T) => boolean)) => {
  const typeAddedAlready = new Set();
  const toReturn = [];

  for (const value of array) {
    if (typeAddedAlready.has(value[property])) {
      continue;
    }
    if (filterFn) {
      if (!filterFn(value)) {
        continue
      }
    }
    typeAddedAlready.add(value[property]);
    toReturn.push(value);
  }
  return toReturn;
}

export const buildTests = (hashMap: TestResults, runnersSet: any, valuesSet: any) => {
  forEachObjectKey(runnersSet, (runnerName, test) => {
    forEachObjectKey(valuesSet, (valuesName, testValues) => {
      if (!hashMap[valuesName]) {
        hashMap[valuesName] = {};
      }
      let testObject = hashMap[valuesName][runnerName];
      if (!testObject) {
        testObject = {
          result: []
        };
        hashMap[valuesName][runnerName] = testObject;
      }
      testObject.run = (duration) => {
        const result = runTest(runnerName, test, valuesName, testValues, duration);
        const totalTime = testObject.average ? testObject.average * testObject.result.length + result : result;
        testObject.result.push(result);
        testObject.average = totalTime / testObject.result.length;
      }
    })
  })
}


export const runTest = <T>(runnerName: string, test: (values: T) => number, valuesName: string, testValues: { values: T, result: number }, duration: number): number => {
  let iterations = 0;
  let totalTesting = 0;
  const start = (new Date().getTime() / 1000)
  while (true) {
    const testStart = (new Date().getTime() / 1000)
    if (test(testValues.values).toString() !== testValues.result.toString()) {
      throw new Error(`expected ${ test(testValues.values) } vs ${ testValues.result } to run ${ name } with runner ${ runnerName } values ${ valuesName }`)
    }
    iterations++;
    const testEnd = (new Date().getTime() / 1000)
    totalTesting += (testEnd - testStart);
    const stop = (new Date().getTime() / 1000)
    if (stop - start > duration) {
      break;
    }
  }

  return iterations / totalTesting
}

export interface TestResults {
  [key: string]: {
    [key: string]: {
      result: number[];
      average?: number;
      run?: (duration: number) => void;
    }
  }
}

export interface TestValueTypes<T, T2> {
  objectTests?: {
    [key: string]: {
      values: T,
      result: T2
    }
  },
  arrayTests?: {
    [key: string]: {
      values: T[],
      result: T2
    }
  }
}
