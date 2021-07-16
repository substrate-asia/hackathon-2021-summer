const express = require('express');
const fs = require('fs');
const busboy = require('connect-busboy');
const IPFS = require('ipfs-core');
const { create, globSource } = require('ipfs-http-client');
const cors = require('cors');


async function main() {
    const ipfs = await IPFS.create();
    var app = express();

    app.use(cors()); // cors
    app.use(busboy()); // upload file

    app.get('/', function (req, res) {
        res.send('<form method="post" enctype="multipart/form-data">'
            + '<p>Title: <input type="text" name="title" /></p>'
            + '<p>Image: <input type="file" name="image" /></p>'
            + '<p><input type="submit" value="Upload" /></p>'
            + '</form>');
    });

    app.post('/', function (req, res) {
        req.pipe(req.busboy);





        //add file data
        let formData = new Map();
        req.busboy.on('field', function(fieldname, val) {
            formData.set(fieldname, val);
        });
        //



        req.busboy.on('file', function (fieldname, file, filename) {
            var tmpfile = './' + filename;
            var fstream = fs.createWriteStream(tmpfile);
            file.pipe(fstream);
            fstream.on('close', async function () {


                //add file data
                console.log(formData)
                console.log(formData.get('name'),formData.get('size'))
                //



                const { cid } = await ipfs.add(globSource(tmpfile));
                res.send(JSON.stringify({status:'ok', data:{'cid':cid.toString()}}));
            });
        });
    });

    app.listen(4000);
    console.log('Express started on port 4000');
}

main();

