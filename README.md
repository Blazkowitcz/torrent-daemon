# torrent-daemon (Tode for friends)

Tode is a torrent client powered by NodeJS and Express. It's a daemon service so it can work in background and can be sync with a client. You can communicate with it by REST API.

## Requirement
- Node
- npm

## Build
```
npm install
```

## Run
Edit : `client_conf.json` file and set values :
- Port
- Torrent_location (place where .torrent files will be stored)
- Torrent_destination (place where torrent content will be stored)

Run : ```node server.js```

## Features

- [x] Download Torrent
- [x] Restart all Torrents on start-up 
- [x] Upload Torrent
- [x] Get Torrent Details
- [x] Pause Torrent
- [x] Resume Torrent
- [x] Delete Torrent
- [x] Move Torrent
- [ ] Start a torrent as Paused
- [ ] Limit speed for the client
- [ ] Limit speed for a Torrent
- [ ] Create Torrent
 
## Bugs
