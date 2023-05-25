const express = require("express");
const body_parser = require("body-parser");
const multer = require("multer");
const cookie_parser = require("cookie-parser");
const popularStories = () => data.songs.filter(s => s.popular === true);
const author = () => data.songs.filter(s => s.authorText === true);

// for handle when upload file
const upload = multer();
// use library for create server(post,get,...)
const app = express();
//for hosting to server , it listion port 80
const http = require("http").Server(app);
const data = require("./data.json");
const song_details = require("./detail_story.json");


app.get("/get/songs/all", function (request, respone) {

    respone.status(200);
    respone.json(data.songs);
});
app.get("/get/song/:id", function (request, respone) {
    const id = request.params.id;
    //function return array id
    const index = data.songs.map(({ id }) => id).indexOf(id);
    // console.log(index);
    if (index == -1) {
        respone.status(404);
    }
    else {
        respone.status(200);
        respone.json(data.songs[index]);
    }

    respone.end();
});
app.get("/get/songs/count/:count", function (request, respone) {
    const count = request.params.count;
    if (count <= data.songs.length) {
        respone.status(200);
        respone.json(data.songs.slice(0, count));
    } else {
        respone.status(404);
    }
    respone.end();
});
app.get("/get/popularSongs", function (request, respone) {
    respone.status(200);
    respone.json(popularStories());
});

app.get("/get/popularSongs/count/:count", function (request, respone) {
    const count = request.params.count;
    if (count <= popularStories().length) {
        respone.status(200);
        respone.json(popularStories().slice(0, count));
    } else {
        respone.status(404);
    }
    respone.end();
});
app.get("/get/song/view/:id", function (request, respone) {
    const id = request.params.id;

    //function return array id
    const index = song_details.map(({ id }) => id.toString()).indexOf(id.toString());
    // console.log(index);
    if (index == -1) {
        respone.status(404);
    }
    else {
        const display = song_details[index];
        display.songName = data.songs[index].songName;
        display.content = display.content.toString();

        respone.status(200);
        respone.json(display);

    }

    respone.end();
});

http.listen(80, function () { console.log("server is running") });


