// events.js
import { socket } from "./socket";

export const socketEvents = ({ setValue }: any) => {
	socket.on("review", (data: any) => {
		console.log("review event received", data);
		setValue((prev: any) => ({
			...prev,
			latestReview: data,
		}));
	});

	socket.on("delete", (id: string) => {
		console.log("delete event received", id);
		setValue((prev: any) => ({
			...prev,
			deletedId: id,
		}));
	})
};