const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');

const router = express.Router()

const Url = require('../models/UrlModel');
const { json } = require('express');

const baseUrl = 'http:localhost:3008';

router.post('/shorten', async(req,res) =>{
    const {longUrl} = req.body;

    if(!validUrl.isUri(baseUrl)){ 
        return res.status(401).json('Invalid base URL')
    }

    const urlCode = shortid.generate()

    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({
                longUrl
            })
            if(url){
                req.json(url)
            }else {
                const shortUrl = baseUrl + '/' + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res,json(url)
            }
        }
        catch(e){
            console.log(e)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid URL')
    }
})

module.exports = router