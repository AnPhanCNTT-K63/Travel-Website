using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Http.Cors;
using System.Web.Mvc;
using System.Web.Services.Description;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class PostController : Controller
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        public ActionResult posts() //GET: /Post/post
        {
            var posts = db.BlogPosts.ToList();

            var formattedPosts = posts.Select(post => new
            {
                post.Id,
                post.Title,
                Datetime = post.Datetime?.ToString("MMMM dd, yyyy hh:mm tt"),
                post.Image,
                post.Content,
                post.Hashtags,
                post.User
            }).ToList();

            return Json(formattedPosts, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin","user")]
        [HttpGet]
        public ActionResult postDetail(int id) //GET: Post/detail/post/{id}
        {
            var post = db.BlogPosts.FirstOrDefault(model => model.Id == id);

            if (post == null)
            {
                return HttpNotFound();
            }

            var formattedPost = new
            {
                post.Id,
                post.Title,
                Datetime = post.Datetime?.ToString("MMMM dd, yyyy hh:mm tt"),
                post.Image,
                post.Content,
                post.Hashtags,
                post.User 
            };

            return Json(formattedPost, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin","user")]
        [HttpPost]
        public ActionResult createPost(BlogPost post, int user_id) //POST: Post/create/post
        {
            Debug.WriteLine(new string('-', 50)); // Divider

            if (ModelState.IsValid)
            {
                post.Datetime = DateTime.UtcNow;
                post.CreatedAt = DateTime.UtcNow;
                post.UpdatedAt = DateTime.UtcNow;

                var user = db.Users.Find(user_id);
                if (user == null)
                {
                    return Json(new { message = "User not found" }, JsonRequestBehavior.AllowGet);
                }

                post.User = user;
                Debug.WriteLine(user_id);
                db.BlogPosts.Add(post);
                int result = db.SaveChanges();

                Debug.WriteLine(result > 0 ? "Post created successfully" : "Failed to create post");
                return Json(new {message = "success"}, JsonRequestBehavior.AllowGet);
            }

            return Json(new { message = "Invalid post data" }, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult getPostsByUserId(int? user_id) // GET: Post/findByUserId/post/{id}
        {
            if (user_id == null)
            {
                return Json(new { error = "User_Id is null" }, JsonRequestBehavior.AllowGet);
            }
            try
            {
                var posts = from post in db.BlogPosts
                    where post.User.Id == user_id
                   select post;
                

                if (!posts.Any())
                {
                    return Json(new { message = "User has no posts." }, JsonRequestBehavior.AllowGet);
                }

                return Json(posts, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = "Error fetching posts: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        [JwtAuthorize("admin", "user")]
        [HttpPut]
        public ActionResult UpdatePost(BlogPost post, int id) //PUT: Post/update/post{id}
        {
            try
            {
                var existingPost = db.BlogPosts.Find(id);
                if (existingPost == null)
                {
                    return Json(new { message = "Post not found" }, JsonRequestBehavior.AllowGet);
                }

                existingPost.Title = post.Title;        
                existingPost.Content = post.Content;    
                existingPost.Hashtags = post.Hashtags;  
                existingPost.Image = post.Image;        

                db.SaveChanges();

                return Json(new { message = "Post updated successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = "Error updating post: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        [JwtAuthorize("admin", "user")]
        [HttpDelete]
        public ActionResult DeletePost(int id)
        {
            try
            {
                var existingPost = db.BlogPosts.Find(id);
                if (existingPost == null)
                {
                    return Json(new { message = "Post not found" }, JsonRequestBehavior.AllowGet);
                }

                db.BlogPosts.Remove(existingPost);

                db.SaveChanges();

                return Json(new { message = "Post deleted successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = "Error deleting post: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }





    }
}