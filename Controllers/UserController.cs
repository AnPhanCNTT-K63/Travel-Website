using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class UserController : Controller
    {
        DbAppContext db = new DbAppContext();

        [JwtAuthorize("admin")]
        [HttpGet]
        public ActionResult users() //GET: /User/users
        {
            var data = db.Users.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}