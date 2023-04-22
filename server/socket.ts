import { io } from './server';

export const initSocket = () =>
  io.on('connection', (socket: any) => {
    try {
      socket.on("review", (data: any) => {
        console.log("Review received", data);
        broadcastReview(data);
      });

      socket.on('disconnect', () => {
        console.log("Disconnected");
      });
    } catch (error: any) {
      io.emit('error', error);
    }
  });

export const broadcastReview = (
  data: any
) => {
  try {
    console.log("Broadcasting review to all active chads");

    // broadcast to all active chads
    io.emit("review", data);

  } catch (error: any) {
    console.log("Error broadcasting review", error);
    
  }
};


export const braodcastDelete = (id: string) => {
  try {
    console.log("Broadcasting delete to all active chads");

    // broadcast to all active chads
    io.emit("delete", id);

  } catch (error: any) {
    console.log("Error broadcasting delete", error);
    
  }
};
