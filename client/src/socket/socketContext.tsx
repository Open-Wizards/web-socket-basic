// SocketContext.js
// @ts-nocheck 
import { useContext, createContext, useState, useEffect } from "react";
import { initSockets } from "./socket";

const SocketContext = createContext({
	reviews: [],
	latestReview: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: any) => {
	const [value, setValue] = useState<any>({
		latestNotification: null,
		notifications: []
	});

	//	When the component mounts, initialize the socket
	useEffect(() => initSockets({ setValue }), [initSockets]);

	useEffect(() => {
		fetch(`http://localhost:5050/ws`)
			.then((res) => res.json())

			.then((data: any) => {
				console.log(data); setValue((prev:any) => ({
					reviews: data,
					...prev,
				}));
			})
	}, [])

	return (
		<SocketContext.Provider value={{ value, setValue }}>
			{children}
		</SocketContext.Provider>
	);
};

export { useSocket };
export default SocketProvider;