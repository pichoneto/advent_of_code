const { readFileSync, readdirSync, writeFileSync } = require("fs");
const path = require("path");

const read = (yearPath, problem, part) => {
  let content = "";
  try {
    content = readFileSync(path.join(yearPath, problem, `part${part}.js`), {
      encoding: "UTF8",
    }).split(/[\r\n]+/);
    content = content
      .slice(content.length - 3, content.length - 1)
      .map((line) => line.replace("//", ""));
  } catch (e) {}
  return content;
};

// This expects to have the year passed as a cli argument
const yearPath = path.join(__dirname, "..", "2015");
const problems = readdirSync(yearPath, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((dir) => dir.name)
  .map(Number)
  .sort((a, b) => a - b)
  .map((a) => a.toString());

let content = "";
problems.map((problem) => {
  let msg = "### **PROBLEM " + problem + "**\n";
  msg += "- Part 1:" + read(yearPath, problem, 1) + "\n\n";
  msg += "- Part 2:" + read(yearPath, problem, 2) + "\n\n";
  content += msg;
});

writeFileSync(path.join(yearPath, "README.md"), content);
