import { Server as HttpServer } from 'http';
import { Socket, Server as NetServer } from 'net';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from "next";

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
};

const users: User[] = [];

const addUser = (user: User) => {
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

            socket.on('join-room', (data) => {
                console.log('join-room', data);
                socket.join(data.room);
                socket.to(data.room).emit('join-room', data);
                addUser({ id: socket.id, ...data });
                io.to(data.room).emit('users-list', getUsersInRoom(data.room));
            });


            socket.on('disconnect', () => {
                console.log('socket disconnected', socket.id);
                const data = removeUser(socket.id);
                if (data) {
                    socket.leave(data.room);
                    socket.to(data.room).emit('users-list', getUsersInRoom(data.room));
                }
            });
        });
        res.socket.server.io = io;
    }
    res.end();
}

export default ioHandler;