const http = require('http');
const fs = require('fs');

const indexDocument = fs.readFileSync('index.html', 'utf-8');
const anotherDocument = fs.readFileSync('another.html', 'utf-8');

function requestListener(request, response) {

  if(request.method === 'GET') {
    if(request.url === '/' || request.url === '/index.html') {
      // You need to load the counter.json here
      // and increment "index" by one and save it
	let fileContents = fs.readFileSync('counter.json', 'utf-8');
	let contentParsed = JSON.parse(fileContents);
	let count = contentParsed.index+1;
	contentParsed.index = count;
	let dataAsJson = JSON.stringify(contentParsed);
	let data = fs.writeFileSync('counter.json', dataAsJson);
	
      // You need to replace the '-!-' in index.html with
      // the new count before serving the document
	  
	  //console.log(indexDocument);
	  let newindexDocument = indexDocument.replace('-!-', count);
	  console.log(newindexDocument);
	  
	  //let testi = document.getElementsByTagName("tt");
	  //console.log("testi: " +testi);
	  
      response.writeHead(200);
      response.end(newindexDocument);
    } else if (request.url ==='/another.html') {

      // You need to load the counter.json here
      // and increment "another" by one and save it
	let fileContentsAnother = fs.readFileSync('counter.json', 'utf-8');
	let contentParsedAnother = JSON.parse(fileContentsAnother);
	let countAnother = contentParsedAnother.another+1;
	//console.log("uusi: " +countAnother);
	contentParsedAnother.another = countAnother;
	let dataAsJsonAnother = JSON.stringify(contentParsedAnother);

	//Write to .json file
	let dataAnother = fs.writeFileSync('counter.json', dataAsJsonAnother);
	
      // You need to replace the '-!-' in another.html
      // the new count before serving the document
	let newanotherDocument = anotherDocument.replace('-!-', countAnother);

      response.writeHead(200);
      response.end(newanotherDocument);
    } else {
      response.writeHead(404);
      response.end('File not found.');
    }
  }
}

const server = http.createServer(requestListener);
server.listen(3000);