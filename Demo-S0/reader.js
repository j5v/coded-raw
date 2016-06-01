// JavaScript for a Coded Raw client. Level S0.

CodedRaw = {
	getModule: function(filename, callback) {
		var httpRequest = new XMLHttpRequest();;
		console.log('Requesting "' + filename + '"');
			httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				console.log('httpRequest.status: ' + httpRequest.status);
				if (httpRequest.status === 200) {
			    	callback(JSON.parse(httpRequest.responseText));
				} else {
					console.log('error: CodedRaw file "' + filename + '" not received.');
				}
			}
		};
		httpRequest.open('GET', filename, true);
		httpRequest.send();
	},

	render: function(mod) {

		console.log('\nInterrogating file');

		var getVersion = new Function(mod.code.getVersion);
		console.log('File says it implements CodedRaw standard "' + getVersion() + '"');

		console.log('File has JSON-safe encoded raw data: (next line)');
		console.log(mod.data);

		console.log('File renders data as: (next line)');
		var getContent = new Function('data', mod.code.getContent);
		console.log(getContent(mod.data));

	}

};


// loader is just for the HTML client.
begin = function() {
	document.getElementById('loading').innerHTML='';
	CodedRaw.files = [
		{filename: 'S0-demo.json', description: 'Demo of a "Level 0" standard file.', selected: true},
		{filename: 'S1-demo.json', description: 'X Demo of a "Level 1" standard file.'},
		{filename: 'S2-demo.json', description: 'X Demo of a "Level 2" standard file.'},
		{filename: 'S3-demo.json', description: 'X Demo of a "Level 3" standard file.'}
	];
};


