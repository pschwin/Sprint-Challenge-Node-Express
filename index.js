// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!

const port = 4001

const server = require('./server.js');

server.listen(port, () =>{
    console.log(`\n Server is running on http://localhost:${port}\n`)
})
