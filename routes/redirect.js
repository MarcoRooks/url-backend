const express = require('express');
const router = express.Router();
const Url = require('../models/UrlModel')

router.get('/:code', async(req,res) => {
    try{
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if(url){
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json('url not found')
        }
    }
    catch (e){
        console.log('this is the error:', e);
        res.status(500),json('Server Error')
    }
})

module.exports = router