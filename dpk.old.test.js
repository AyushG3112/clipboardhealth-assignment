const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

function calculateSHA3_512(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("returns proper stringified representation as partition key if event.partitionKey was a JSON less than MAX_PARTITION_KEY_LENGTH", () => {
    const partitionKey = deterministicPartitionKey({
      partitionKey: {"foo":"bar"}
    });

    expect(partitionKey).toBe(`{"foo":"bar"}`);
  })

  it("returns proper hashed representation as partition key if event.partitionKey was a JSON more than MAX_PARTITION_KEY_LENGTH", () => {
    let event = {
      partitionKey: {"foo": crypto.randomBytes(300).toString()}
    };

    const partitionKey = deterministicPartitionKey(event);


    expect(partitionKey).toBe(calculateSHA3_512(JSON.stringify(event.partitionKey)));
  })

  it("returns proper hashed representation as partition key if event.partitionKey was a string more than MAX_PARTITION_KEY_LENGTH", () => {
    const eventPartitionKey = crypto.randomBytes(300).toString();

    let event = {
      partitionKey: eventPartitionKey
    };

    const partitionKey = deterministicPartitionKey(event);

    expect(partitionKey).toBe(calculateSHA3_512(eventPartitionKey));
  })
});
