var http = require('http');
var hostname = '127.0.0.1';
var port = 8080;

const server = http.createServer(function(req,res){
    console.log('REQUEST : ', req);

    const path = req.url;
    const method = req.method;
    if(path ==='/products'){
        if(method === GET){
            res.writeHead(200,{'Content-Type': 'application/json'});
            const products = Json.stringify([
                {
                name : "농구공",
                price: 5000
                },
            ]);
            res.end(products);
        } else if (method === 'POST'){
            res.end("생성되었습니다!");
        }
    }
    
    res.end("Hello Client");
});

server.listen(port, hostname);

console.log('goodbuymarket server on');

