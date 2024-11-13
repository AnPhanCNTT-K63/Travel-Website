using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class AuthController : Controller //Auth/
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpPost] 
        public ActionResult signup(User user) //POST: Auth/signup
        {
            if (ModelState.IsValid)
            {
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
            Debug.WriteLine("Here");
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult signin(User user) //POST: Auth/signin
        {
            var loginUser = db.Users.FirstOrDefault(model => model.Email == user.Email);
            if (loginUser == null)
            {
                return Json(new { message = "Not Found" });
            }
            else if (loginUser.Password != user.Password)
            {
                return Json(new { message = "Incorrect Password" });
            }
            else
            {
                var token = JwtHelper.GenerateToken(loginUser.Email, loginUser.Role);
                Debug.WriteLine(loginUser);
                Debug.WriteLine(token);
                return Json(new { token = token, user = loginUser }, JsonRequestBehavior.AllowGet);
            }
        }

        [JwtAuthorize]
        [HttpGet]
        public ActionResult signout() //GET: Auth/signout
        {
            return Json(new { message = "Log out success" }, JsonRequestBehavior.AllowGet);
        }
    }
}