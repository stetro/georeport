var assert = require('assert');
var github = require('octonode');
var mozWalker = require('escomplex-ast-moz');
var escomplex = require('escomplex');
var fs = require('fs');
var esprima = require('esprima');
var async = require('async');

var client = github.client();

var georeportRepo = client.repo('stetro/georeport');

var escomplexResults = [];

describe('Software Quality Assurance', function() {
	before(function(done) {
		walkThrough('./src/', function(error, files) {
			if (error) {
				throw error
			}
			async.eachSeries(files, function(filename, callback) {
				var content = fs.readFileSync(filename, 'utf-8');
				var syntax = esprima.parse(content, {
					tolerant: true,
					loc: true,
					range: true
				});
				var result = escomplex.analyse(syntax, mozWalker);
				escomplexResults.push(result);
				callback();
			}, done);
		});
	});
	describe('Analyzability', function(done) {
		it('should let escomplex working', function(done) {
			async.eachSeries(escomplexResults, function(result, callback) {
				assert.ok(result.maintainability > 50);
				callback();
			}, done);
		});
	});
	describe('Maturity', function(done) {
		it('shouldn\'t have a minmal size of critical issues or open bugs', function(done) {
			georeportRepo.issues(function(error, data) {
				if (error) {
					throw error;
				}
				var countOpenBugs = 0;
				for (var i = data.length - 1; i >= 0; i--) {
					for (var j = data[i].labels.length - 1; j >= 0; j--) {
						if (data[i].labels[j].name == 'bug' && data[i].state == 'open') {
							countOpenBugs = countOpenBugs + 1;
						}
					};
				};
				assert.equal(countOpenBugs, 0);
				done();
			});
		});
		it('shouldn\'t have a minmal size of critical issues or open bugs in the past', function(done) {
			georeportRepo.issues(function(error, data) {
				if (error) {
					throw error;
				}
				var countBugs = 0;
				for (var i = data.length - 1; i >= 0; i--) {
					for (var j = data[i].labels.length - 1; j >= 0; j--) {
						if (data[i].labels[j].name == 'bug') {
							countBugs = countBugs + 1;
						}
					};
				};
				assert.ok(countBugs < 20, "Are to many bugs in the past available?");
				done();
			});
		});
	});
	describe('Developer base', function(done) {
		it('should have at least one subscriber and stargazers', function(done) {
			georeportRepo.info(function(error, data) {
				if (error) {
					throw error;
				}
				assert.ok(data.subscribers_count > 0, "Project has more than one subscriber");
				assert.ok(data.stargazers_count > 0, "Project has more than one subscriber");
				done();
			});
		});
		it('should have more than one collaborator', function(done) {
			georeportRepo.collaborators(function(error, data) {
				if (error) {
					throw error;
				}
				assert.ok(data.length > 0, "Project should have more than one collaborator");
				done();
			});
		});
		it('should have more than one contributor', function(done) {
			georeportRepo.contributors(function(error, data) {
				if (error) {
					throw error;
				}
				assert.ok(data.length > 0, 'should have more than one contributor');
				done();
			});
		});
		it('should have more than one commit in the last weeks', function(done) {
			georeportRepo.commits(function(error, data) {
				if (error) {
					throw error;
				}
				assert.ok(data.length > 0, 'should have more than one commit in the last weeks');
				done();
			});
		});
	});
});

// http://stackoverflow.com/q/5827612/
function walkThrough(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) {
			return done(err);
		}
		var i = 0;
		(function next() {
			var file = list[i++];
			if (!file) {
				return done(null, results);
			}
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walkThrough(file, function(err, res) {
						results = results.concat(res);
						next();
					});
				} else {
					results.push(file);
					next();
				}
			});
		}());
	});
}