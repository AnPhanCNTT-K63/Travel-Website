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
using WebBackendProject.Models.DTO;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("post")]
    public class PostController : Controller
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        [Route("posts")]
        public ActionResult Posts() //GET: /post/posts
        {
            var posts = db.BlogPosts
                .Where(p => p.User.IsDeleted == false)
                .Select(p => new
                {
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                    p.User.UserProfile.Avatar,
                   UserId = p.User.Id,
                    p.Owner,
                    p.Id,
                    p.Title,
                    p.Datetime,
                    p.Image,
                    p.Content,
                    p.Hashtags,
                })
                .ToList();

            var formattedPosts = posts.Select(post => new
            {
                post.FirstName,
                post.LastName,
                post.Avatar,
                post.UserId,
                post.Owner,
                post.Id,
                post.Title,
                Datetime = post.Datetime.HasValue
            ? post.Datetime.Value.ToString("MMMM dd, yyyy hh:mm tt")
            : "No Date",
                post.Image,
                post.Content,
                post.Hashtags,
            }).ToList();

            return Json(formattedPosts, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        [Route("detail/{id}")] //GET: post/detail/{id}
        public ActionResult PostDetail(int id) 
        {
            var post = db.BlogPosts
                .Select(p => new
                {
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                    p.User.UserProfile.Avatar,
                    p.Owner,
                    p.Id,
                    p.Title,
                    p.Datetime,
                    p.Image,
                    p.Content,
                    p.Hashtags,
                   
                })
                .FirstOrDefault(model => model.Id == id);

            if (post == null)
            {
                return HttpNotFound();
            }

            var formattedPost = new
            {
                post.FirstName,
                post.LastName,
                post.Owner,
                post.Avatar,
                post.Id,
                post.Title,
                Datetime = post.Datetime?.ToString("MMMM dd, yyyy hh:mm tt"),
                post.Image,
                post.Content,
                post.Hashtags,
            };

            return Json(formattedPost, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get/deleted/{user_id}")] //GET: post/get/deleted/{user_id}
        public ActionResult GetDeletedPost(int user_id)
        {
            var post = db.BlogPosts
                .Where(p => p.User.Id == user_id && p.IsDeleted == true)
                .Select(p => new
                {
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                    p.User.UserProfile.Avatar,
                    p.Owner,
                    p.Id,
                    p.Title,
                    p.Datetime,
                    p.Image,
                    p.Content,
                    p.Hashtags,
                    p.DeletedAt
                })
                .ToList() ;

            if (post == null)
            {
                return HttpNotFound();
            }

            return Json(post, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin","user")]
        [Route("create")] //POST: post/create
        [HttpPost]
        public ActionResult CreatePost(BlogPost post, int user_id) 
        {
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
        [Route("user/{user_id}")] // GET: post/user/{user_id}
        public ActionResult GetPostsByUserId(int? user_id) 
        {
            if (user_id == null)
            {
                return Json(new { error = "User_Id is null" }, JsonRequestBehavior.AllowGet);
            }
            try
            {
                var posts = from post in db.BlogPosts
                    where post.User.Id == user_id && post.IsDeleted == false
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

        [HttpPut]
        [Route("update/{id}")] //PUT: post/update/{id}
        public ActionResult UpdatePost(PostInfoUpdate post, int id) 
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
                existingPost.UpdatedAt = DateTime.UtcNow;

                db.SaveChanges();

                return Json(new { message = "Post updated successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = "Error updating post: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPatch]
        [Route("delete/soft/{id}")]  //PATCH: post/delete/soft/{id}
        public ActionResult DeleteSoftPost(int id)
        {
            try
            {
                var post = new BlogPost { Id = id };

                db.BlogPosts.Attach(post);

                post.IsDeleted = true;
                post.DeletedAt = DateTime.UtcNow;

                db.Entry(post).Property(b => b.IsDeleted).IsModified = true;
                db.Entry(post).Property(b => b.DeletedAt).IsModified = true;

                db.SaveChanges();

                return Json(new { message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPatch]
        [Route("restore")]  //PATCH: post/restore
        public ActionResult RestorePost(int id)
        {
            try
            {
                var post = new BlogPost { Id = id };

                db.BlogPosts.Attach(post);

                post.IsDeleted = false;
                post.DeletedAt = null;

                db.Entry(post).Property(b => b.IsDeleted).IsModified = true;
                db.Entry(post).Property(b => b.DeletedAt).IsModified = true;

                db.SaveChanges();

                return Json(new { message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }
        }


        [JwtAuthorize("admin", "user")]
        [HttpDelete]
        [Route("delete/permanent/{id}")]  //DELETE: post/delete/permanent/{id}
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