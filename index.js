const { createHash } = require("crypto");
const https = require("https");

function getPasswordHash(password) {
  const hash = createHash("sha1").update(password);
  return hash.digest("hex");
}

function collectMatchingLeakedHashes(hash) {
  return new Promise((resolve, reject) => {
    const subHash = hash.substring(0, 5);
    const options = {
      hostname: "api.pwnedpasswords.com",
      port: 443,
      path: `/range/${subHash}`,
      method: "GET",
    };
    const data = [];

    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        data.push(d.toString());
      });
      res.on("end", () => {
        const formattedDataSet = data
          .join()
          .split("\n")
          .map((e) => e.trim())
          .map((e) => {
            const [hash] = e.split(":");
            return subHash.toUpperCase() + hash;
          });
        return resolve(formattedDataSet);
      });
    });

    req.on("error", (error) => {
      return reject(error);
    });

    req.end();
  });
}

module.exports = function (password) {
  const hash = getPasswordHash(password);
  return collectMatchingLeakedHashes(hash).then((hashesMap) =>
    hashesMap.includes(hash.toUpperCase())
  );
};
