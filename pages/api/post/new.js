import formidable from "formidable"
import Post from "@/models/Post"
import dbConnect from "@/lib/dbConnect"

import mime from "mime"
import { join } from "path"
import { stat, mkdir, writeFile } from "fs/promises"
import * as dateFn from "date-fns"
import fs from "fs"

export const config = {
    api: {
        bodyParser: false
    }
}

async function handlePostFormReq(req, res){
    const form = formidable({ multiples: true })

    const formData = new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if(err) {
                reject("error")
            }
            resolve({fields, files})
        })
    })

    try {
        console.log("about to parse form data")
        const { fields, files } = await formData
        
        try {
            await saveFormData(fields, files)
            res.status(200).send({ status: "submitted" })
            return
        } catch (e) {
            res.status(500).send({ status: "couldn't save data to database" })
            return
        }
    } catch (e) {
        res.status(400).send({ status: "invalid submission" })
        return
    }
}

async function saveFormData(fields, files) {
    // save to database
    console.log("about to save form data")

    try {
        await dbConnect()

        console.log("database is connected")

        // save file
        const fileUrl = await saveFile(files.thumbnail[0])

        console.log("fileUrl: ", fileUrl)

        const post = await Post.create({
            title: fields.title[0],
            description: fields.description[0],
            slug: fields.slug[0],
            tags: fields.tag,
            content: fields.content[0],
            thumbnail: fileUrl
        })

    } catch (e) {
        console.log(e)
    }

    console.log(JSON.stringify(fields))
    console.log(JSON.stringify(files))
  }

  async function saveFile(file) {
    const oldPath = file.filepath
    
    //const buffer = Buffer.from(await file.arrayBuffer())
    const currentMonthDir = dateFn.format(Date.now(), "dd-MM-Y")
    const relativeUploadDir = join("uploads", currentMonthDir)
    const uploadDir = join(process.cwd(), "public", relativeUploadDir, "/")
    
    try {
        await stat(uploadDir)
    } catch (e) {
        if(e.code === "ENOENT"){
            await mkdir(uploadDir, { recursive: true })
        } else {
            console.error("Error while trying to create directory when uploading a file\n", e)
        }
    }

    try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${file.originalFilename.replace(/\.[^/.]+$/,"")}-${uniqueSuffix}.${mime.getExtension(file.mimetype)}`;
        
        const newPath = uploadDir + filename

        const rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function(err) {
            if (err) console.log(err)
            console.log("Successfully uploaded file")
        })

        return newPath
    } catch(e){
        console.error("Error while trying to upload a file\n", e)
    }

}

export default async function handler(req, res) {
    if (req.method == "POST") {
        console.log("here in POST")
       // console.log(req.body)
        await handlePostFormReq(req, res);
    } else {
        res.status(404).send("method not found");
    }
  }