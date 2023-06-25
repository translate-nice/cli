#!/usr/bin/env node

import input from '../src/input';
import help from '../src/help';
import download from '../src/download';
import replace from '../src/replace';
import repo from '../config/repo';

async function run(): Promise<void> {
  help();

  const answers = await input([
    {
      type: 'list',
      name: 'frame',
      message: '请选择要生成的模版项目：',
      choices: Object.keys(repo),
      default: 'monorepo-library',
    },
    {
      type: 'input',
      name: 'folder',
      message: '请输入文件夹名：',
      default: 'my-project',
    },
  ]);

  // @ts-ignore
  const url = repo[answers.frame];

  if (!url) {
    console.log('仓库不存在');
    return;
  }

  await download(url, answers.folder);

  await replace(answers.folder);
}

run();
