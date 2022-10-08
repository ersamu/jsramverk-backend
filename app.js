require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const allRoutes = require('./routes/index');
const docsModel = require('./models/documents');

const app = express();
const httpServer = require("http").createServer(app);

const port = process.env.PORT || 1337;

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', allRoutes);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.sockets.on('connection', function(socket) {
    console.log(socket.id); // Nått lång och slumpat

    socket.on('create', function(room) {
        console.log("Skapar rum");
        socket.join(room);
    });

    socket.on('update', (data) => {
        console.log("Uppdaterar");
        socket.to(data["_id"]).emit("update", data);
        docsModel.updateDocument(data);
    });

    socket.on('leave', function(room) {
        console.log("Lämnar rum");
        socket.leave(room);
    });
});

const server = httpServer.listen(port, () => {
    console.log('Api listening on port ' + port);
});

module.exports = server;
