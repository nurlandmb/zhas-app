const PostModel =  require('../models/post-model');
const PostDto =  require('../dtos/post-dto');
const ApiError =  require("../exceptions/api-error");

class PostService {

    async create(post, id){
        const newPost = await PostModel.create({...post, author: id});
        const postDto = new PostDto(newPost);
        return postDto;
    }

    async getPosts(user){
        const posts = await PostModel.find();
        const postDtos = posts.map(post => new PostDto(post));
        return postDtos;
    }

    async delete(id){
        const post = await PostModel.findById(id);
        if(!post){
            throw ApiError.BadRequest("Пост не найден");
        }
        await post.deleteOne();
        return true;
    }

    async edit(post, editorId){
        const dbPost = await PostModel.findById(post.id);
        if(!dbPost){
            throw ApiError.BadRequest("Пост не найден");
        }
        if(String(dbPost.author) !== String(editorId)){
            console.log(editorId);
            console.log(dbPost.author);
            throw ApiError.BadRequest("Хакер пойман");
        }
        dbPost.title = post.title || dbPost.title;
        dbPost.content = post.content || dbPost.content;
        dbPost.for = post.for || dbPost.for;
        dbPost.status = 'created';
        await dbPost.save();
        const postDto = new PostDto(dbPost);
        return postDto;
    }
}

module.exports = new PostService();