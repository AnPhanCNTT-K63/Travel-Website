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


    }
}