using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Web.Services.Description;
using System.Web.UI;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class UserController : Controller
    {
        DbAppContext db = new DbAppContext();
  
        public void UpdateUserStatus()
        {
            var threshold = DateTime.UtcNow.AddMinutes(-1);

            var users = db.Users.Where(u => u.LastActive < threshold && u.IsOnline).ToList();

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
        public ActionResult heartBeat(int userId) //POST: User/heartBeat
        {
            try
            {
                var user = db.Users.Find(userId);
                if (user == null)
                {
                    return Json(new { error = "User not found." }, JsonRequestBehavior.AllowGet);
                }

                user.LastActive = DateTime.UtcNow;

                if (user.IsOnline == false)
                {
                    user.IsOnline = true;
                }
                db.SaveChanges();

                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        public ActionResult getProfileByUserId(int user_id) //GET: User/profile/{user_id}
        {
            try
            {
                var profile = db.UserProfiles.Find(user_id);
                int? age = 0;
                if(profile != null)
                {
                    age = profile.Birthday.HasValue ? DateTime.Now.Year - profile.Birthday.Value.Year : (int?)null;
                }
                var result = new { profile, age };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        public ActionResult getAccountInfo(int? user_id) // GET: User/account/{user_id}
        {
            try
            {
                if (!user_id.HasValue)
                {
                    return Json(new { error = "User ID is required." }, JsonRequestBehavior.AllowGet);
                }

                var profile = db.UserProfiles
                    .Include(p => p.User)
                    .FirstOrDefault(p => p.UserId == user_id);

                if (profile == null)
                {
                    return Json(new { error = "User profile not found." }, JsonRequestBehavior.AllowGet);
                }

                if (profile.User == null)
                {
                    return Json(new { error = "Associated user not found." }, JsonRequestBehavior.AllowGet);
                }

                var result = new
                {
                    profile.User.Username,
                    profile.FirstName,
                    profile.LastName,
                    registerDate = profile.User.CreatedAt?.ToString("MMMM dd, yyyy hh:mm tt")
                };

                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [JwtAuthorize("admin", "user")]
        [HttpPut]
        public ActionResult updateAccount(UserInfoUpdate userInfo) //POST: User/update/account
        {
            if(ModelState.IsValid)
            {
                try
                {
                    var user = db.Users.Find(userInfo.user_id);
                    
                    if(!string.IsNullOrEmpty(userInfo.Username) && user.Username != userInfo.Username)
                    {
                        user.Username = userInfo.Username;
                    }
                    if (!string.IsNullOrEmpty(userInfo.Email) && user.Email != userInfo.Email)
                    {
                        user.Email = userInfo.Email;
                    }
                    if (!string.IsNullOrEmpty(userInfo.Password) && user.Password != userInfo.Password)
                    {
                        user.Password = userInfo.Password;
                    }

                    var token = JwtHelper.GenerateToken(user.Email, user.Username, user.Role, user.Id.ToString());

                    db.SaveChanges();

                    return Json(userInfo, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { message = "Invalid" }, JsonRequestBehavior.AllowGet);
            }
        }

        [JwtAuthorize("admin", "user")]
        [HttpDelete]
        public ActionResult SoftDeleteAccount(int user_id) //DELETE: User/softDeleted/account/{user_id}
        {
            try
            {
                var user = db.Users.Find(user_id);
                if (user == null)
                {
                    return Json(new { message = "User not found" }, JsonRequestBehavior.AllowGet);
                }

                user.IsDeleted = true;
                user.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                return Json(new { message = "User marked as deleted" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult RestoreAccount(int user_id)
        {
            try
            {
                var user = db.Users.FirstOrDefault(u => u.Id == user_id && u.IsDeleted);
                if (user == null)
                {
                    return Json(new { message = "User not found or not deleted" }, JsonRequestBehavior.AllowGet);
                }

                user.IsDeleted = false;
                user.UpdatedAt = DateTime.Now;
                db.SaveChanges();

                return Json(new { message = "User restored successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }




    }
}