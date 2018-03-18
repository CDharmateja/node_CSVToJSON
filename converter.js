const fs = require('fs')
const path = require('path')

let json = [];

fs.readFile(path.join(__dirname, './customer-data.csv'), {encoding: 'utf-8'}, function(error, data) {
if (error) return  console.error(error);
	const params = {};
	let string = '';
	let list = [];
	for (i of data) {
		if (i === '\r') {
			continue;
		}
		if (i === '\n') {
			params[string] = '';
			list.push(string);
			string = '';
			break;
		}
		else if (i === ',') {
			params[string] = '';
			list.push(string);
			string = '';
		}
		else {
			string += i;
		}
	}
	let temp = Object.assign({}, params);
	let index = 0;
	for (i of data) {
		if (i === '\r') {
			continue;
		}
		if (i === '\n') {
			temp[list[index]] = string;
			string = '';
			json.push(temp);
			temp = Object.assign({}, params);
			index = 0;
		}
		else {
			if (i === ',') {
				temp[list[index]] = string;
				string = '';
				index++;
			}
			else {
				string += i;
			}
		}
	}
	json.splice(0, 1);
	fs.writeFile('customer-data.json', JSON.stringify(json, null, 2), function(error) {
		if (error) return console.erro(error);
		console.log('writing is done');
	});
});
