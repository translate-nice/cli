import fs from "fs";
import rc from "replace";

import ora from "ora";

import input from "./input";
import config from "../config";

async function replace(folder: string): Promise<void> {
  if (fs.existsSync(`${folder}/.clirc`) === false) {
    console.log("nice~");
    return;
  }

  let clirc = JSON.parse(
    fs.readFileSync(`${folder}/${config.configFile}`, "utf-8")
  );

  const answers = await input(clirc.prompts);

  const spinner = ora("generate...");
  spinner.start();

  try {
    fs.unlinkSync(`${folder}/README.md`);
    fs.unlinkSync(`${folder}/.git`);
    fs.unlinkSync(`${folder}/.clirc`);
  } catch (e) {}

  clirc.prompts.forEach(async (prompt: { name: string }) => {
    await rc({
      regex: "<\\$" + prompt.name + "\\$>",
      replacement: answers[prompt.name],
      paths: [`${folder}/`],
      recursive: true,
      silent: true,
    });
  });

  fs.renameSync(`${folder}/${clirc.readme}`, `${folder}/README.md`);

  spinner.stop();
  console.log("nice~");
}

export default replace;
