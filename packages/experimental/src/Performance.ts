/**
 * Measures the performance of a DataTagged operation function
 * 
 * This function takes a sample data array and a DataTagged operation function,
 * then returns detailed performance statistics including minimum, maximum,
 * average execution times, and percentiles. All times are measured in milliseconds (ms).
 * 
 * @example
 * import { measurePerformance } from "experimental/DataTagged";
 * import * as DataTagged from "experimental/DataTagged";
 * 
 * // Generate sample data
 * const samples = FastCheck.sample(DataTagged.genMap(4), 100);
 * 
 * // Measure performance of DataTagged.sort
 * const stats = measurePerformance(samples, DataTagged.sort);
 * console.log(stats);
 * // { minMs: 0.123, maxMs: 2.456, avgMs: 0.789, p50Ms: 0.675, p90Ms: 1.234, p99Ms: 2.345 }
 * 
 * @since 1.0.0
 */
export const measurePerformance = <T>(
  samples: ReadonlyArray<T>,
  operation: (input: T) => unknown,
  iterations = 5
): { 
  minMs: number; 
  maxMs: number; 
  avgMs: number; 
  p50Ms: number; 
  p90Ms: number; 
  p99Ms: number;
  totalMs: number;
  count: number;
} => {
  if (samples.length === 0) {
    throw new Error("Sample array must not be empty");
  }

  const times: number[] = [];
  const totalStart = performance.now();

  // Run the operation on each sample multiple times
  for (const sample of samples) {
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      operation(sample);
      const end = performance.now();
      times.push(end - start);
    }
  }

  const totalEnd = performance.now();

  // Sort the times for percentile calculations
  times.sort((a, b) => a - b);
  
  // Calculate statistics (all in milliseconds)
  const min = times[0];
  const max = times[times.length - 1];
  const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
  
  // Calculate percentiles (in milliseconds)
  const p50 = times[Math.floor(times.length * 0.5)];
  const p90 = times[Math.floor(times.length * 0.9)];
  const p99 = times[Math.floor(times.length * 0.99)];
  
  return {
    minMs: min,         // Minimum execution time in milliseconds
    maxMs: max,         // Maximum execution time in milliseconds
    avgMs: avg,         // Average execution time in milliseconds
    p50Ms: p50,         // 50th percentile (median) in milliseconds
    p90Ms: p90,         // 90th percentile in milliseconds
    p99Ms: p99,         // 99th percentile in milliseconds
    totalMs: totalEnd - totalStart,  // Total time including all iterations in milliseconds
    count: samples.length * iterations  // Total number of operations performed
  };
};

/**
 * Compares the performance of multiple DataTagged operations
 * 
 * This function measures and compares the performance of multiple operations
 * on the same dataset, providing a comparative analysis. All times are measured in milliseconds (ms).
 * 
 * @example
 * import { comparePerformance } from "experimental/DataTagged";
 * import * as DataTagged from "experimental/DataTagged";
 * 
 * // Generate sample data
 * const samples = FastCheck.sample(DataTagged.genMap(4), 50);
 * 
 * // Compare performance of multiple operations
 * const comparison = comparePerformance(samples, {
 *   sort: DataTagged.sort,
 *   toCBOR: DataTagged.toCBOR,
 *   fromCBOR: (data) => DataTagged.fromCBOR(DataTagged.toCBOR(data))
 * });
 * 
 * console.log(comparison);
 * // {
 * //   sort: { minMs: 0.123, maxMs: 2.456, avgMs: 0.789, ... },
 * //   toCBOR: { minMs: 0.234, maxMs: 1.345, avgMs: 0.567, ... },
 * //   fromCBOR: { minMs: 0.345, maxMs: 2.789, avgMs: 0.987, ... }
 * // }
 * 
 * @since 1.0.0
 */
export const comparePerformance = <T>(
  samples: ReadonlyArray<T>,
  operations: Record<string, (input: T) => unknown>,
  iterations = 3
): Record<string, ReturnType<typeof measurePerformance>> => {
  const results: Record<string, ReturnType<typeof measurePerformance>> = {};
  
  for (const [name, operation] of Object.entries(operations)) {
    results[name] = measurePerformance(samples, operation, iterations);
  }
  
  return results;
};

// Example usage with your 's' variable:
// const performanceStats = measurePerformance(s, DataTagged.sort);
// console.log("Performance Stats:", performanceStats);
// // Results will show all times in milliseconds (ms)
//
// const comparisonStats = comparePerformance(s, {
//   sort: DataTagged.sort,
//   toCBOR: DataTagged.toCBOR,
//   fromCBOR: (data) => DataTagged.fromCBOR(DataTagged.toCBOR(data))
// });
// console.log("Comparison Stats:", comparisonStats);