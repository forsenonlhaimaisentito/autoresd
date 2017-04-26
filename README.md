# autoresd

A small program intended to be run as a daemon (via pm2) that listens
for screen changes and reconfigures the changed screen as the `--auto`
option of xrandr would do.

I wrote it because in some environment I had to use xrandr every time
I wanted to resize the virt-viewer window of my Linux guests.

## Usage

First, globally install pm2:
```
npm install -g pm2
```

Then you can simply install the dependencies and start autoresd:
```
npm install
npm start
```
