const app = require("./app");
const Db = require("./config/Connection");
const jwt = require("jsonwebtoken");
const socket = require("./Utils/socket");
const { Op, literal } = require("sequelize");
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to unhandled exception`);
  process.exit(1);
});

const server = app.listen(process.env.PORT || 8081, () => {
  console.log(`Server is working on port http:localhost:${process.env.PORT}`);
});
const io = socket.init(server);
io.on("connection", async (socket) => {
  console.log("### Socket IO client connected", socket.id);
  socket.on("disconnect", (reason) => {
    console.log("### Socket IO client disconnected");
  });

  socket.on("leaveHome", () => {
    socket.disconnect();
  });
  socket.on("createRoom", (roomName) => {
    socket.join(roomName);
  });
  socket.on("LeaveRoom", (roomName) => {
    socket.leave(roomName);
  });
  socket.on("JoinPeer", async (userToken, UserPeerId) => {
    try {
      const decodedData = jwt.verify(userToken, process.env.JWT_SECRET);
      const Data = await Db.EmployeeModel.findOne({
        where: {
          _id: decodedData.id
        },

        attributes: ["_id"]
      });
      const MessageConversationId = await Db.MessagingModel.findOne({
        where: {
          [Op.or]: [
            {
              ConversationId: `${Data._id}/${UserPeerId}`
            },
            {
              ConversationId: `${UserPeerId}/${Data._id}`
            }
          ]
        },
        raw: true
      });
      if (MessageConversationId) {
        console.log(MessageConversationId.ConversationId, "1");
        socket.join(MessageConversationId.ConversationId);
      } else {
        console.log(`${UserPeerId}/${Data._id}`, "2");
        socket.join(`${UserPeerId}/${Data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  });
  const data = {
    message: "socket testing"
  };
});
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
