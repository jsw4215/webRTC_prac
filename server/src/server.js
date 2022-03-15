const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const cors = require("cors");
//const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(cors());
//app.use(router)

let roomObjArr = [];
const MAXIMUM = 5;

io.on("connection", (socket) => {
  console.log("새로운 connection이 발생하였습니다.");
  let myRoomName = null;
  let myNickname = null;

  socket.on("join_room", (roomName, nickName) => {
    myRoomName = roomName;
    myNickname = nickName;

    let isRoomExist = false;
    let targetRoomObj = null;

    // forEach를 사용하지 않는 이유: callback함수를 사용하기 때문에 return이 효용없음.
    for (let i = 0; i < roomObjArr.length; ++i) {
      if (roomObjArr[i].roomName === roomName) {
        // Reject join the room
        if (roomObjArr[i].currentNum >= MAXIMUM) {
          socket.emit("reject_join");
          return;
        }

        isRoomExist = true;
        targetRoomObj = roomObjArr[i];
        break;
      }
    }

    // Create room
    if (!isRoomExist) {
      console.log("createRoom!!");
      targetRoomObj = {
        roomName,
        currentNum: 0,
        users: [],
      };
      roomObjArr.push(targetRoomObj);
    }

    //Join the room
    targetRoomObj.users.push({
      socketId: socket.id,
      nickName,
    });

    ++targetRoomObj.currentNum;

    socket.join(roomName);
    console.log("after join, emit 'accept_join'", targetRoomObj.users);
    socket.emit("accept_join", targetRoomObj.users);
    //join_room end
  });

  socket.on("ice", (ice, remoteSocketId) => {
    socket.to(remoteSocketId).emit("ice", ice, socket.id);
  });

  socket.on("offer", (offer, remoteSocketId, localNickname) => {
    socket.to(remoteSocketId).emit("offer", offer, socket.id, localNickname);
  });

  socket.on("answer", (answer, remoteSocketId) => {
    socket.to(remoteSocketId).emit("answer", answer, socket.id);
  });



  
});

server.listen(PORT, () => console.log(`서버가 ${PORT} 에서 시작되었어요`));
