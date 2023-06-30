import jwt, { sign, SignOptions, VerifyOptions, Secret } from 'jsonwebtoken'
import * as fs from 'fs';
import * as path from 'path';
import { Request } from "express";
const createError = require('http-errors');

require('dotenv').config();
import { Employee } from "../types/employee"

interface tokenType {
    key: string;
    passphrase: string;
}



// const accessTokenSecret: tokenType = {key: "crmproject", passphrase: process.env.ACCESS_TOKEN_SECRET || ''};//fs.readFileSync(path.join(__dirname, './../private.key'));//process.env.ACCESS_TOKEN_SECRET;
const accessTokenSecret = fs.readFileSync(path.join(__dirname, './../private.key'), 'utf8');

module.exports = {
    signAccessToken(payload: Employee){
        return new Promise((resolve, reject) => {
            const signInOptions: SignOptions = {
                // RS256 uses a public/private key pair. The API provides the private key 
                // to generate the JWT. The client gets a public key to validate the 
                // signature
                // algorithm: 'RS256',
                expiresIn: '1h'
              };
            sign({ payload }, accessTokenSecret, signInOptions, (err: any, token: string | undefined) => {
                if (err) {
                reject(err)
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken(token: string){
        return new Promise((resolve, reject) => {
            const verifyOptions: VerifyOptions & {complete: true} = {
                // algorithms: ['RS256'],
                complete: true
            };
            jwt.verify(token, accessTokenSecret, verifyOptions, (error, payload) => {
                if (error) {
                    const message = error.name == 'JsonWebTokenError' ? 'Unauthorized' : error.message
                    reject(createError.Unauthorized(message))
                }
                resolve(payload)
            })
        })
    },
    user(req: Request) {
        const token = req.headers.authorization?.split(" ")[1];
        return this.verifyAccessToken(token)
        .then((payload: Employee) => {
            return payload;
        })
    }

}