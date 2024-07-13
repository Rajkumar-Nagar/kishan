export const SOCKET_EVENTS = {
    JOIN_ROOM: 'join-room',
    USERS_LIST: 'users-list',
    UPDATE_BID: 'update-bid',
    INIT_BID: 'init-bid',
    MAKE_BID: 'make-bid',
    BID_SUCCESS: 'bid-success',
    BID_FAILED: 'bid-failed',
    BID_WINNER: 'bid-winner'
} as const;