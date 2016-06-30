// JavaScript for a Coded Raw client. Level S0.

// Implemented as a closure: the interface is returned, all else is private.

CodedRaw = (function () {

	var
		getModule = function (filename, callback) {

			var httpRequest = new XMLHttpRequest();
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

		render = function (mod) {

			console.log('\nInterrogating file');

			var getVersion = new Function(mod.code.getVersion);
			console.log('File says it implements CodedRaw standard "' + getVersion() + '"');

			console.log('File has JSON-safe encoded raw data: (next line)');
			console.log(mod.data);

			console.log('File renders data as: (next line)');
			var getContent = new Function('data', mod.code.getContent);
			console.log(getContent(mod.data));

		};

	return { // public interface
		getModule,
		render
	}

})();


