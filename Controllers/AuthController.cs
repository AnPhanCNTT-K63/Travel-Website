using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Web.Mvc;
using WebBackendProject.Models;
using System.Web.Helpers;
using WebBackendProject.Models.DTO;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("auth")]
    public class AuthController : Controller
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpPost]
        [Route("signup")] //POST: auth/signup
        public ActionResult Signup(SignUpInfo info) 
        {
            var existedUserEmail = db.Users.FirstOrDefault(eu => eu.Email == info.Email);
            var existedUserUsername = db.Users.FirstOrDefault(eu => eu.Username == info.Username);
            var softDeletedUserEmail = db.Users.FirstOrDefault(u => u.IsDeleted == true);

            if (existedUserEmail != null)
            {
                return Json(new { error = "Email is already in use. Please login or click forgot password" }, JsonRequestBehavior.AllowGet);
            }
            if(existedUserUsername != null)
            {
                return Json(new { error = "User has been used by someone else" }, JsonRequestBehavior.AllowGet);
            }
            if (softDeletedUserEmail != null)
            {
                return Json(new { error = "Your account has been deleted. After 30 days your account will be completely deleted. Please contact admin to restore within 30 days" }, JsonRequestBehavior.AllowGet);
            }

            if (ModelState.IsValid)
            {   
                var user = new User();
                user.CreatedAt = DateTime.UtcNow;
                user.UpdatedAt = DateTime.UtcNow;
                user.LastActive = DateTime.UtcNow;
                user.Role = "user";
                user.Username = info.Username;
                user.Password = info.Password;
                user.Email = info.Email;          
                db.Users.Add(user);
                db.SaveChanges();

                var profile = new UserProfile
                {
                    UserId = user.Id
                };
                db.UserProfiles.Add(profile);
                db.SaveChanges();
            }
            return Json(info, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("signin")] //POST: auth/signin
        public ActionResult Signin(SignInInfo info) 
        {
            if(ModelState.IsValid)
            {
                var loginUser = db.Users
                .FirstOrDefault(u => u.Email == info.Email);

                if (loginUser == null)
                {
                    return Json(new { error = "Email Not Found" });
                }
                else if (loginUser.Password != info.Password)
                {
                    return Json(new { error = "Incorrect Password" });
                }
                else if (loginUser.IsDeleted == true)
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
            {
                return Json(new { error = "Invalid Info" });
            }
            
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        [Route("signout")] //GET: auth/signout
        public ActionResult Signout() 
        {
            return Json(new { message = "Log out success" }, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin", "user")]
        [HttpPost]
        [Route("password/check")] //POST: auth/password/check
        public ActionResult PasswordCheck(string password, int? user_id) 
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