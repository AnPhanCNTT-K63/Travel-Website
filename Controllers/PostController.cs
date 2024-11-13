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

        [HttpPost]
        public ActionResult createPost(BlogPost post, int user_id) //POST: Post/create/post
        {
            if (ModelState.IsValid)
            {

                var user = db.Users.Find(user_id);
                if (user == null)
                {
                    return Json(new { message = "User not found" }, JsonRequestBehavior.AllowGet);
                }

                post.User = user;

                db.BlogPosts.Add(post);
                int result = db.SaveChanges();

                Debug.WriteLine(result > 0 ? "Post created successfully" : "Failed to create post");
                return Json(new {message = "success"}, JsonRequestBehavior.AllowGet);
            }

            return Json(new { message = "Invalid post data" }, JsonRequestBehavior.AllowGet);
        }


    }
}