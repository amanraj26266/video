// const { Server } = require("socket.io"); 3

// const io = new Server(8000, {
//   cors: true,
// });

// const emialToScoketIdMap = new Map();
// const socketIdToEmailMap = new Map();

// io.on("connection", socket => {
//   console.log(`socket Connected`, socket.id);
//   socket.on('room:join', (data) => {
//     const { email, room } = data;
//     emialToScoketIdMap.set(email, socket.id);
//     socketIdToEmailMap.set(socket.id, email);
//     // show email and id of user who is joining 
//     io.to(room).emit("user:joined", { email, id: socket.id });
//     socket.join(room); //Allow user to join
//     io.to(socket.id).emit('room:join', data);// push the user in room
//   });

//   //handling incomming call 
//   socket.on('user:call', ({ to, offer }) => {
//     io.to(to).emit('incomming:call', { from: socket.id, offer });
//   });

//   //handling call accepted
//   socket.on('call:accepted', ({ to, ans }) => {
//     io.to(to).emit('call:accepted', { from: socket.id, ans });
//   });

//   //handling negotiation
//   socket.on('peer:nego:needed', ({ to, offer }) => {
//     console.log('peer:nego:needed', offer);
//     io.to(to).emit('peer:nego:needed', { from: socket.id, offer });
//   });

//   //hnadle negotiation done 
//   socket.on('peer:nego:done', ({ to, ans }) => {
//     console.log('peer:nego:done', ans);

//     io.to(to).emit('peer:nego:final', { from: socket.id, ans });
//   });
// });




const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
