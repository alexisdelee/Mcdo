const EventEmitter = require("events");
const HttpException = new EventEmitter();

module.exports = {
  listener: {
    ClientException: {
      BadRequestError: () => HttpException.on("BadRequestError", (response, err) => response.status(400).json({ message: err })),
      UnauthorizedError: () => HttpException.on("UnauthorizedError", (response, err) => response.status(401).json({ message: err || "Permission denied" })),
      NotFoundError: () => HttpException.on("NotFoundError", (response, err) => response.status(404).json({ message: err }))
    },
    ServerException: {
      InternalError: () => HttpException.on("InternalError", (response, err) => response.status(500).json({ message: err })),
      NotImplementedError: () => HttpException.on("NotImplementedError", (response, err) => response.status(501).json({ message: err })),
      ServiceUnavailableError: () => HttpException.on("ServiceUnavailableError", (response, err) => response.status(503).json({ message: err }))
    }
  },
  emitter: {
    ClientException: {
      BadRequestError: (response, data) => HttpException.emit("BadRequestError", response, data),
      UnauthorizedError: (response, data) => HttpException.emit("UnauthorizedError", response, data),
      NotFoundError: (response, data) => HttpException.emit("NotFoundError", response, data)
    },
    ServerException: {
      InternalError: (response, data) => HttpException.emit("InternalError", response, data),
      NotImplementedError: (response, data) => HttpException.emit("NotImplementedError", response, data),
      ServiceUnavailableError: (response, data) => HttpException.emit("ServiceUnavailableError", response, data)
    }
  }
};
