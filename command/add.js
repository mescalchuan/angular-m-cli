const co = require('co')
const ejs = require('ejs');
const fs = require('fs');
const chalk = require('chalk')
const path = require('path');
const ora = require('ora');
const utils = require('../config/utils');

module.exports = (pageName) => {
    co(function*() {
		//读取模板文件
		const mainEJS = fs.readFileSync(path.resolve(__dirname, '../template/main.ejs'), 'utf-8');
		const indexEJS = fs.readFileSync(path.resolve(__dirname, '../template/index.ejs'), 'utf-8');
		const scssFile = fs.readFileSync(path.resolve(__dirname, '../template/index.scss'), 'utf-8');
		//参数获取新建container名字并转换成驼峰
		const containerName = utils.toHump(pageName);
		//文件路径
		const destinationEntry = `./entry/${containerName}`;
		const destinationEntryJS =  `./entry/${containerName}/main.js`;
		const destinationPage = `./pages/${containerName}`;
		const destinationPageHTML = `./pages/${containerName}/index.html`;
		const destinationScssDir = './css';
		const destinationScss = `./css/${containerName}.scss`;
		//渲染模板文件
		const controllerName = containerName + 'Ctrl';
		const directiveName = containerName + 'Dir';
		const mainResult = ejs.render(mainEJS, {pageName: containerName, controllerName, directiveName});
		const indexResult = ejs.render(indexEJS, {pageName: containerName, controllerName});

		const entryPathExist = fs.existsSync(destinationEntry);
		const pagePathExist = fs.existsSync(destinationPage);
		const scssPathExist = fs.existsSync(destinationScssDir);
		if(entryPathExist) {
			console.log(chalk.red('\n The project has the same container, see your entry folder.'));
			process.exit();
		}
		if(pagePathExist) {
			console.log(chalk.red('\n The project has the same container, see your pages folder.'));
			process.exit();
		}
		if(!scssPathExist) {
			fs.mkdirSync(destinationScssDir);
		}
		//复制文件
		const spinner = ora(`Creating ${containerName} pages...`).start();
		try {
			fs.mkdirSync(destinationEntry);
			fs.mkdirSync(destinationPage);
			fs.writeFileSync(destinationEntryJS, mainResult);
			fs.writeFileSync(destinationPageHTML, indexResult);
			fs.writeFileSync(destinationScss, scssFile);
		}
		catch(err) {
			spinner.stop();
			console.log(chalk.red('\n Can not create new page.'));
			process.exit();
		}
		spinner.stop();
		console.log(chalk.green('\n Create succeed!'));
		process.exit();
	})
}
