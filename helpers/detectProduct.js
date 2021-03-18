const tf = require("@tenorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");
const fs = require("fs");
const path = require("path");

function detectProduct(Url) {
  const image = fs.readFileSync(url);
  const input = tf.node.decodeImage(image, 3);
  console.log(input);
}

detectProduct(path.join(__dirname, "../uploads/1.jpg"));
