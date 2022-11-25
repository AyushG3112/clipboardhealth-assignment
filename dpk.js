const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function processPartitionKeyCandidate(candidate) {
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate
}

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return processPartitionKeyCandidate(TRIVIAL_PARTITION_KEY);
  }

  if (event.partitionKey) {
    return processPartitionKeyCandidate(event.partitionKey);
  }

  return processPartitionKeyCandidate(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
}
