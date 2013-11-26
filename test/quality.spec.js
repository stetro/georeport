var assert = require('assert');
var github = require('octonode');

var client = github.client();

var georeportRepo = client.repo('stetro/georeport');

describe('Software Quality Assurance', function() {
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