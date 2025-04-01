import { IncomingForm } from 'formidable';
import { Request, Response, NextFunction } from 'express';
import {allowedMimeType, MAX_IMAGE_SIZE} from "../utils/helper";
import Error, {Message, StatusCode} from "../utils/enums";
import {Writable} from "stream";

const upload = (req: Request, res: Response, next: NextFunction) => {
    const options = {
        maxFileSize: MAX_IMAGE_SIZE,
        filter: ({mimetype}: any) => {
            return mimetype && allowedMimeType.includes(mimetype)
        },
        // save to memory
        fileWriteStreamHandler: (file: any) => {
            const chunks: any[] = [];
            return new Writable({
                write(chunk, encoding, callback) {
                    chunks.push(chunk);
                    callback();
                },
                final(callback) {
                    file.buffer = Buffer.concat(chunks);
                    callback();
                }
            });
        }
    }

    const form = new IncomingForm(options)

    form.parse(req, (e, fields, files) => {

        // user not updating image
        if(fields.posterImage){

            const title = fields.title ? fields.title[0] : undefined
            const publishingYear = fields.publishingYear ? fields.publishingYear[0] : undefined

            req.body = {
                ...req.body,
                title,
                publishingYear,
            }

            return next()
        }

        if (e) {
            if(e.code === 1009){
                // file too large
                const error = new Error<{}>(e, StatusCode.E400, Message.ErrParams)
                return res.status(error.statusCode).send({
                    info: error.info,
                    message: error.message
                })
            }
            // other error
            const error = new Error<{}>(e, StatusCode.E500, Message.ServerError)
            return res.status(error.statusCode).send({
                info: error.info,
                message: error.message
            })
        }


        const title = fields.title ? fields.title[0] : undefined
        const publishingYear = fields.publishingYear ? fields.publishingYear[0] : undefined
        const file = files.posterImage ? files.posterImage[0] : undefined


        req.body = {
            ...req.body,
            title,
            publishingYear,
            file,
        }

        return next()
    });
};

export default upload;
