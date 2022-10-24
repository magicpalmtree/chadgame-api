const request = async (func, req, res) => {
    try {
        const data = await func(req.body);
        // console.log(data);
        res.send(data);
    }catch(err){
        console.log(func)
        console.error(err);
        res.status(500)
        res.send(err)
    }
}

module.exports = request;