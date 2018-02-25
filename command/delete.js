const co = require('co');
const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const rm = require('rimraf').sync;
const prompt = require('co-prompt');

module.exports = (pageName) => {
	co(function* () {
		const containerName = pageName;

	    console.log(chalk.yellow(`\n Your './entry/${containerName}, './pages/${containerName}', './css/${containerName}.scss' will be removed.`));
	    const answer = yield prompt('\n are you sure? Input y or n \n');
	    
	    if(answer == 'n' || !answer) process.exit();
	    
	    const destinationEntry = `./entry/${containerName}`;
	    const destinationPage = `./pages/${containerName}`;
	    const destinationScss = `./css/${containerName}.scss`;

	    try {
	    	fs.readdirSync(destinationEntry);
	    	fs.readdirSync(destinationPage);
	    	fs.readFileSync(destinationScss);
	    }
	    catch(err) {
	    	console.log(chalk.red(`\n Can not find ${containerName}.`));
	    	process.exit();
	    }

	    const spinner = ora(`Deleting ${containerName} pages...`).start();
	    try {
	    	rm(destinationEntry);
	    	rm(destinationPage);
	    	rm(destinationScss);
	    }
	    catch(err) {
	    	spinner.stop();
			console.log(chalk.red(`\n Can not delete ${containerName}`));
			process.exit();
	    }
	    spinner.stop();
	    console.log(chalk.green('\n Delete succeed!'));
	    process.exit();
	})
}