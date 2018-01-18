const documentation = require('documentation');
const fs = require('fs');

const template = fs.readFileSync('./template.html', 'utf-8');

documentation.build(['src/imask.js'], {}).then(res => {
  fs.writeFileSync('./docs.html', template.replace('<main></main>', '<main>' + JSON.stringify(res) + '</main>'));
});
