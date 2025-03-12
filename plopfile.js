import * as path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(filename);
const templatesPath = path.join(currentDir, '.templates');
const componentsPath = path.join(currentDir, 'src', 'components');

// eslint-disable-next-line import/no-anonymous-default-export
export default function (plop) {
  plop.setHelper('firstUpperCase', (text) => text.charAt(0).toUpperCase() + text.slice(1));

  plop.setGenerator('component', {
    description: 'New UI Component',
    prompts: [
      {
        type: 'list',
        name: 'atomType',
        choices: ['atom', 'molecule', 'organism', 'template', 'page'],
        message: 'Atomic Type',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component Name',
      },
    ],
    actions: [
      {
        type: 'add',
        templateFile: path.join(templatesPath, 'component/fc.hbs'),
        path: path.join(
          componentsPath,
          '{{ atomType }}s',
          '{{ firstUpperCase name }}',
          '{{ firstUpperCase name }}.tsx',
        ),
      },
      {
        type: 'add',
        templateFile: path.join(templatesPath, 'component/index.hbs'),
        path: path.join(componentsPath, '{{ atomType }}s', '{{ firstUpperCase name }}', 'index.ts'),
      },
      {
        type: 'add',
        templateFile: path.join(templatesPath, 'component/fcTypes.hbs'),
        path: path.join(componentsPath, '{{ atomType }}s', '{{ firstUpperCase name }}', 'types.ts'),
      },
    ],
  });
}
