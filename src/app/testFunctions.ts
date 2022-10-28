// this essentially copies how lodash runs object iteration

export const forEachObjectKey = <T>(object: T, toRun: (key: string, value: T[keyof T]) => any) => {
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

export const buildTests = (hashMap: AllTestResults, runnersSet: any, valuesSet: any) => {
  forEachObjectKey(runnersSet, (runnerName, test) => {
    forEachObjectKey(valuesSet, (valuesName, testValues) => {
      if (!hashMap[valuesName]) {
        hashMap[valuesName] = {};
      }
      let testObject = hashMap[valuesName][runnerName];
      if (!testObject) {
        testObject = {
          results: [],
          average: 0,
          marginOfError: 0
        };
        hashMap[valuesName][runnerName] = testObject;
      }
      testObject.run = (duration) => {
        const result = runTest(runnerName, test, valuesName, testValues, duration);
        testObject.results.push(result);

        const totalAverages = (testObject.average ? (testObject.average * (testObject.results.length - 1) + result.average) : result.average);
        testObject.average = totalAverages / testObject.results.length;

        const totalMarginOfError = testObject.marginOfError ? testObject.marginOfError * (testObject.results.length - 1) + result.marginOfError : result.marginOfError;
        testObject.marginOfError = totalMarginOfError / testObject.results.length;
      }
    })
  })
}

export interface SingleBenchmarkResult {
  iterations: number;
  totalTime: number;
}

export interface BenchmarkResults {
  iterations: number;
  average: number;
  fastest: number;
  slowest: number;
  marginOfError: number;
  totalTime: number;
}

// so certain code can run faster than the performance.mark / performance.now() can track
// therefore splitting up tests into batches essentially
const runMiniTest = <T>(runnerName: string, test: (values: T) => number, valuesName: string, testValues: { values: T, result: number }, duration: number, testNumber: number): SingleBenchmarkResult => {
  let iterations = 0;
  const start = performance.now();
  window.performance.mark(`miniTestStart${ testNumber }`);

  while (true) {
    const result = test(testValues.values);
    if (result.toString() !== testValues.result.toString()) {
      throw new Error(`expected ${ test(testValues.values) } vs ${ testValues.result } to run ${ name } with runner ${ runnerName } values ${ valuesName }`)
    }
    iterations++;
    const stop = performance.now();
    if ((stop - start) > duration * 1000) {
      break;
    }
  }
  window.performance.mark(`miniTestEnd${ testNumber }`);
  const results = window.performance.measure(`test${ testNumber }`, `miniTestStart${ testNumber }`, `miniTestEnd${ testNumber }`);
  return {
    iterations,
    totalTime: (results.duration / 1000),
  }
}

export const runTest = <T>(runnerName: string, test: (values: T) => number, valuesName: string, testValues: { values: T, result: number }, duration: number): BenchmarkResults => {
  let iterations = 0;
  const start = performance.now();
  let stop;
  const singleResults = [];

  while (true) {
    const result = runMiniTest(runnerName, test, valuesName, testValues, 0.2, iterations);
    singleResults.push(result);
    iterations++;
    stop = performance.now();
    if ((stop - start) > duration * 1000) {
      break;
    }
  }

  const toReturn: BenchmarkResults = {
    iterations: 0,
    average: 0,
    fastest: Number.POSITIVE_INFINITY,
    slowest: Number.NEGATIVE_INFINITY,
    marginOfError: 1,
    totalTime: 0
  }
  for (const result of singleResults) {
    toReturn.iterations += result.iterations;
    toReturn.totalTime += result.totalTime;
    const averageExecution = result.iterations / result.totalTime;
    if (toReturn.fastest > averageExecution) {
      toReturn.fastest = averageExecution;
    }
    if (toReturn.slowest < averageExecution) {
      toReturn.slowest = averageExecution;
    }
  }
  toReturn.average = (toReturn.iterations / toReturn.totalTime);
  toReturn.marginOfError = Math.round(Math.max(Math.abs((toReturn.average - toReturn.fastest) / toReturn.average), Math.abs((toReturn.average - toReturn.slowest) / toReturn.average)) * 100)
  return toReturn;
}

export interface TestResults {
  [key: string]: TestResultItem
}

export interface AllTestResults {
  [key: string]: TestResults
}

export interface TestResultItem {
  results: BenchmarkResults[];
  run?: (duration: number) => void;
  average: number;
  marginOfError: number;
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
