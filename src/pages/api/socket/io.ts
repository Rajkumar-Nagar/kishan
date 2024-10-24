import { Server as HttpServer } from 'http';
import { Socket, Server as NetServer } from 'net';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from "next";
import { SOCKET_EVENTS as SE } from '@/constants';

type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};

export const config = {
    api: {
        bodyParser: false,
    },
};

type User = {
    id: string;
    name: string;
    room: string;
    userId: string;
};

const users: User[] = [];

const addUser = (user: User) => {
    const index = users.findIndex(u => u.userId === user.userId);
    if (index !== -1) {
        users.splice(index, 1);
    }
    users.push(user);
};

const removeUser = (id: string) => {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id: string) => {
    return users.find((u) => u.id === id);
};

const getUsersInRoom = (room: string) => {
    return users.filter((u) => u.room === room);
};

const BID_DETAILS: { [key: string]: any } = {};

const addBidDetails = (data: any) => {
    const { room, ...other } = data;
    BID_DETAILS[room] = { ...BID_DETAILS[room], ...other };
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = '/api/socket/io';
        const httpServer: HttpServer = res.socket.server as any;
        const io = new SocketIOServer(httpServer, {
            path,
            addTrailingSlash: false
        });
        io.on('connection', (socket) => {
            console.log('socket connected', socket.id);

            socket.on(SE.JOIN_ROOM, (data) => {
                console.log(SE.JOIN_ROOM, data);
                socket.join(data.room);
                socket.to(data.room).emit(SE.JOIN_ROOM, data);
                addUser({ id: socket.id, ...data });
                io.to(data.room).emit(SE.USERS_LIST, getUsersInRoom(data.room));
                io.to(socket.id).emit(SE.INIT_BID);
            });

            socket.on(SE.MAKE_BID, (data) => {
                console.log(SE.MAKE_BID, data);
                io.to(data.room).emit(SE.MAKE_BID, data);
                // addBidDetails({ room: data.room, currentBid: data.bid, highestBidder: data.userId });
            });

            // to get the users in room
            socket.on(SE.USERS_LIST, (data) => {
                io.to(data.room).emit(SE.USERS_LIST, getUsersInRoom(data.room));
            });

            socket.on(SE.UPDATE_BID, (data) => {
                addBidDetails(data);
            });

            socket.on('disconnect', () => {
                console.log('socket disconnected', socket.id);
                const data = removeUser(socket.id);
                if (data) {
                    socket.leave(data.room);
                    socket.to(data.room).emit(SE.USERS_LIST, getUsersInRoom(data.room));
                }
            });
        });
        res.socket.server.io = io;
    }
    res.end();
}

export default ioHandler;