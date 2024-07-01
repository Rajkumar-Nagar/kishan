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

            socket.on('disconnect', () => {
                console.log('socket disconnected', socket.id);
            });
        });
        res.socket.server.io = io;
    }
    res.end();
}

export default ioHandler;