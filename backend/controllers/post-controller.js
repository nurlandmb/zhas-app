const postService = require('../services/post-service')

class PostController {

    async create(req, res, next){
        try{
            const post = await postService.create(req.body, req.user.id);
            res.send(post);
        }catch(err){
            console.log(err);
            next(err);
        }

    }

    async getAll(req, res, next){
        try{
            const posts = await postService.getPosts(req.user);
            res.send(posts);
        }catch(err){
            console.log(err);
            next(err);
        }

    }

    async delete(req, res, next){
        try{
            console.log(req);
            await postService.delete(req.params.id);
            res.send(true);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async edit(req, res, next){
        try{
            const posts = await postService.edit(req.body, req.user.id);
            res.send(posts);
        }catch(err){
            console.log(err);
            next(err);
        }
    }
}

module.exports = new PostController();