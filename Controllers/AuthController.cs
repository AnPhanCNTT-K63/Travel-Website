using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Web.Mvc;
using WebBackendProject.Models;
using System.Web.Helpers;

namespace WebBackendProject.Controllers
{
    public class AuthController : Controller //Auth/
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpPost] 
        public ActionResult signup(User user) //POST: Auth/signup
        {
            var existedUserEmail = db.Users.FirstOrDefault(eu => eu.Email == user.Email);
            var existedUserUsername = db.Users.FirstOrDefault(eu => eu.Username == user.Username);
            var softDeletedUserEmail = db.Users.FirstOrDefault(u => u.IsDeleted == true);


            if (existedUserEmail != null)
            {
                return Json(new { error = "Email is already in use. Please login or click forgot password" }, JsonRequestBehavior.AllowGet);
            }
            if(existedUserUsername != null)
            {
                return Json(new { error = "user has been used by someone else" }, JsonRequestBehavior.AllowGet);
            }
            if (softDeletedUserEmail != null)
            {
                return Json(new { error = "Your account has been deleted. After 30 days your account will be completely deleted. Please contact admin to restore within 30 days" }, JsonRequestBehavior.AllowGet);
            }

            if (ModelState.IsValid)
            {
                user.CreatedAt = DateTime.UtcNow;
                user.UpdatedAt = DateTime.UtcNow;
                user.Role = "user";
                db.Users.Add(user);
                int a = db.SaveChanges();
                if (a > 0)
                {
                    Debug.WriteLine("True");
                }
                else
                {
                    Debug.WriteLine("False");
                }
            }
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult signin(User user) // POST: Auth/signin
        {
            var loginUser = db.Users
                .FirstOrDefault(u => u.Email == user.Email);

            if (loginUser == null)
            {
                return Json(new { error = "Email Not Found" });
            }
            else if (loginUser.Password != user.Password)
            {
                return Json(new { error = "Incorrect Password" });
            }
            else if(loginUser.IsDeleted == true)
            {
                return Json(new { error = "Your account has been deleted. After 30 days your account will be completely deleted. Please contact admin to restore within 30 days" });
            }
            else
            {
                var token = JwtHelper.GenerateToken(loginUser.Email, loginUser.Username, loginUser.Role, loginUser.Id.ToString());
                Debug.WriteLine(loginUser);
                Debug.WriteLine(token);
                return Json(new
                {
                    token = token,
                    message = "Success"
                }, JsonRequestBehavior.AllowGet);
            }
        }



        [JwtAuthorize("admin", "user")]
        [HttpGet]
        public ActionResult signout() //GET: Auth/signout
        {
            return Json(new { message = "Log out success" }, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin", "user")]
        [HttpPost]
        public ActionResult passwordCheck(string password, int? user_id) //POST: Auth/passwordCheck
        {
            var user = db.Users.Find(user_id);
            if(user.Password != password)
            {
                return Json(new { message = "Invalid Password" }, JsonRequestBehavior.AllowGet);
            }
            else { return Json(new { message = "Success"}, JsonRequestBehavior.AllowGet);
            }
        }
        
    }
}