import inquirer, { QuestionCollection, Answers } from "inquirer";

const input = async function (list: QuestionCollection): Promise<Answers> {
  let answers: Answers = await inquirer.prompt(list);

  return answers;
};

export default input;
