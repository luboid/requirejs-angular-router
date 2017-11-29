var fs = require('fs');

function process(path) {
  let dirs = fs.readdirSync(path);
  for (let dir of dirs) {
    if (
      dir.endsWith('.js') ||
      dir.endsWith('.ts') ||
      dir.endsWith('.json') ||
      dir.endsWith('.map')
    ) {
      if (dir.endsWith('.js')) {
        var content = fs.readFileSync(path + '/' + dir); //, 'utf8'
        if (content.indexOf('module.id') > -1) {
          console.log(path + '/' + dir);
          content =
            '/// <amd-dependency name="module" path="module" />\n\n' + content;
          fs.writeFileSync(path + '/' + dir, content);
        }
      }
    } else {
      process(path + '/' + dir);
    }
  }
}

process('./src/esm');
