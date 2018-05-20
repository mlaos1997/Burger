// Dependencies
const connection = require('./connection.js');

function queryQuestionMark(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
}

function sequelTable(object) {
	var arr = [];

	for (var key in object) {
		arr.push(key + "=" + object[key]);
	}
	return arr.toString();
}

var orm = {
	all: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";"
		connection.query(queryString, function(err, result) {
			if(err) {
				throw err;
			}
			cb(result);
		});
	},
	// vals is an array of values that we want to save to cols
	// cols are the columns we want to insert the values into
	create: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += queryQuestionMark(vals.length);
		queryString += ") ";

		console.log(queryString);

		connection.query(queryString, vals, function(err, result) {
			if(err) {
				throw err;
			}
			cb(result);
		});
	},
	// objColsVals would be the columns and values that you want to update
	// and example of objColVals would be {name: panther, sleepy: true}
	update: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += sequelTable(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if(err) {
				throw err;
			}
			cb(result);
		});
	}
};

module.exports = orm;