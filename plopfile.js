export default function (plop) {
  plop.setGenerator('feature', {
    description: '新しいfeatureフォルダを生成',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'feature名を入力してください'
    }],
    actions: [
      {
        type: 'addMany',
        destination: 'src/features/{{name}}',
        base: 'templates/feature',
        templateFiles: 'templates/feature/**/*'
      }
    ]
  });
}