import * as fs from 'fs';
import * as process from 'process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { cli } from './cli.mjs';

const questions = [
  {
    type: 'text',
    name: 'filepath',
    message: 'What file path  ex) common/Button',
  },
  {
    type: 'text',
    name: 'classname',
    message: 'What class name  ex) Button',
  },
  {
    type: 'boolean',
    name: 'story',
    message: 'Create story(Y/n)',
  },
];

const __dirname = dirname(fileURLToPath(import.meta.url));

const main = async () => {
  console.log('Code-gen : Create Layout Component');

  // 対話
  const answers = await cli(questions);
  console.log(answers);

  console.log('Start Code Generate...');
  const from_dir = path.join(__dirname, '../scripts/template/layout/');
  const to_dir = path.join(
    __dirname,
    '../src/layouts/' + answers['filepath'] + '/'
  );

  // フォルダ作成
  fs.mkdirSync(to_dir, { recursive: true });

  // テンプレート生成
  let readcomp = fs.readFileSync(from_dir + 'index.tsx', 'utf-8');
  readcomp = readcomp.replace(/LAYOUTTEMPLATE/g, answers['classname']);
  fs.writeFileSync(to_dir + 'index.tsx', readcomp);

  // ストーリーテンプレート生成
  if (answers['story']) {
    let readstory = fs.readFileSync(
      from_dir + 'layouttemplate.stories.tsx',
      'utf-8'
    );
    readstory = readstory.replace(/LAYOUTTEMPLATE/g, answers['classname']);
    fs.writeFileSync(
      to_dir + answers['classname'].toLowerCase() + '.stories.tsx',
      readstory
    );
  }
  console.log('Succeded!!');
  process.exit();
};

(async () => {
  await main();
})();
