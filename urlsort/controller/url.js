const {nanoid} = require("nanoid");
const Url = require("../models/Url")

async function handleGenerateShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})
    const shortId = nanoid(8);
    await Url.create({
        shortId : shortId,
        redirectUrl: body.url,
        visitHistory:[]
    })
    return res.json({id:shortId})
}

async function handleGetAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result = await Url.findOne({shortId});
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics
}