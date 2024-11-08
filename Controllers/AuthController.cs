using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class AuthController : Controller
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
            var loginUser = db.Users.FirstOrDefault(model => model.email == user.email);
            if (loginUser == null)
            {
                return Json(new { message = "Not Found" });
            }
            else if (loginUser.password != user.password)
            {
                return Json(new { message = "Incorrect Password" });
            }
            else
            {
                var token = JwtHelper.GenerateToken(loginUser.email, loginUser.role);
                Debug.WriteLine(loginUser.role);
                return Json(new { token = token }, JsonRequestBehavior.AllowGet);
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