import * as crypto from 'crypto';

export function generateRandomString(length: number = 24) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex');
}

/**
 * Calculates the weighted mean.
 *
 * @param arrValues
 * @param arrWeights
 */
const weightedMean = (arrValues: number[], arrWeights: number[]) => {
  const result = arrValues
    .map((value, i) => {
      const weight = arrWeights[i];
      const sum = value * weight;
      return [sum, weight];
    })
    .reduce((p, c) => [p[0] + c[0], p[1] + c[1]], [0, 0]);

  return result[0] / result[1];
};

/**
 * Gets the estimated waiting time.
 *
 * @param n Number of people before us in the queue
 * @param history History of time between admissions, newest first
 * @param num_samples Number of samples to use in calculation, must be >= 3
 */
export const getEstimatedQueueTime = (n: number, history: number[], num_samples: number = 8) => {

  if (history.length === 0) {
    return 0;
  }

  // If not enough history we use arithmetic mean
  if (history.length < num_samples) {

    const sum = history.reduce((a, b) => a + b, 0);
    return Math.trunc(n * sum / history.length);
  }

  const rev_history = history.slice().reverse();
  console.log(rev_history);

  const samples = rev_history.slice(0, num_samples);
  let weights = [0.3, 0.1, 0.1];

  const q_len = samples.length - weights.length;

  const weight_sum = weights.reduce((a, b) => a + b, 0);
  const q_weight = (1.0 - weight_sum) / q_len;

  const q_weights: number[] = new Array(q_len);
  for (let i = 0; i < q_weights.length; i++) {
    q_weights[i] = q_weight;
  }

  // weights now complete and normalized (summing to 1)
  weights = weights.concat(q_weights);
  //console.log(weights);
  //console.log(samples);

  // now we have samples with matching weights, calculate weighted average
  const mean = weightedMean(samples, weights);
  // console.log(mean)

  return Math.trunc(mean * n);
};
