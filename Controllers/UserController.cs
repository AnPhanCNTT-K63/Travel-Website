using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class UserController : Controller
    {
        DbAppContext db = new DbAppContext();
        private Timer _timer;
        public UserController()
        {
            _timer = new Timer(UpdateUserStatus, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
        }

        private void UpdateUserStatus(object state)
        {
            var threshold = DateTime.UtcNow.AddMinutes(-1);

            var users = db.Users.Where(u => u.LastActive < threshold).ToList();

            foreach (var user in users)
            {
                user.IsOnline = false;
            }

            db.SaveChanges();
        }


        [JwtAuthorize("admin")]
        [HttpGet]
        public ActionResult users() //GET: /User/users
        {
            var data = db.Users.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult heartBeat(int user_id) //POST: User/heartBeat
        {
            try
            {
                Debug.WriteLine(new string('-', 50)); // Divider
                Debug.WriteLine("here");

                var user = db.Users.Find(user_id);
                if (user != null)
                {
                    user.LastActive = DateTime.UtcNow;
                    user.IsOnline = true;
                    db.SaveChanges();
                    return Json(user_id, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { error = "User not found." }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { error = "Error: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
           
        }
    }
}