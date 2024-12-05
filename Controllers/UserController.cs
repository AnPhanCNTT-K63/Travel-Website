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
using Newtonsoft.Json.Linq;
using WebBackendProject.Models.DTO;
using System.Net;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("user")]
    public class UserController : Controller
    {
        DbAppContext db = new DbAppContext();

        public void UpdateUserStatus()
        {
            var threshold = DateTime.UtcNow.AddSeconds(-30);

            var users = db.Users.Where(u => u.LastActive < threshold && u.IsOnline).ToList();

            foreach (var user in users)
            {
                user.IsOnline = false;
            }

            db.SaveChanges();
        }


        [HttpGet]
        [Route("users")] //GET: user/users
        public ActionResult Users()
        {
            var data = db.Users.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("ping")] //POST: user/ping
        public ActionResult HeartBeat(int userId)
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

        [HttpGet]
        [Route("profile/{user_id}")] //GET: user/profile/{user_id}
        public ActionResult GetProfileByUserId(int user_id)
        {
            try
            {
                var profile = db.UserProfiles.Find(user_id);
                int? age = 0;
                if (profile != null)
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

        [HttpPut]
        [Route("profile/update")] //PUT: user/profile/update
        public ActionResult UpdateUserProfile(UserProfileDTO profile)
        {
            try
            {
                if (profile == null || profile.UserId == 0)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Invalid profile data.");
                }

                var userProfile = db.UserProfiles.FirstOrDefault(u => u.UserId == profile.UserId);

                bool isUpdated = false;

                if (userProfile.FirstName != profile.FirstName) { userProfile.FirstName = profile.FirstName; isUpdated = true; }
                if (userProfile.LastName != profile.LastName) { userProfile.LastName = profile.LastName; isUpdated = true; }
                if (userProfile.Address != profile.Address) { userProfile.Address = profile.Address; isUpdated = true; }
                if (userProfile.City != profile.City) { userProfile.City = profile.City; isUpdated = true; }
                if (userProfile.Country != profile.Country) { userProfile.Country = profile.Country; isUpdated = true; }
                if (userProfile.PostalCode != profile.PostalCode) { userProfile.PostalCode = profile.PostalCode; isUpdated = true; }
                if (userProfile.AboutMe != profile.AboutMe) { userProfile.AboutMe = profile.AboutMe; isUpdated = true; }
                if (userProfile.Phone != profile.Phone) { userProfile.Phone = profile.Phone; isUpdated = true; }
                if (userProfile.Birthday != profile.Birthday) { userProfile.Birthday = profile.Birthday; isUpdated = true; }
                if (userProfile.QuickIntroduction != profile.QuickIntroduction) { userProfile.QuickIntroduction = profile.QuickIntroduction; isUpdated = true; }

                if (isUpdated)
                {
                    db.Entry(userProfile).State = EntityState.Modified;
                    db.SaveChanges();
                    return Json(new { message = "Profile updated successfully" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { message = "No changes detected" }, JsonRequestBehavior.AllowGet);
                }
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

        //[JwtAuthorize("admin", "user")]
        [HttpGet]
        [Route("account/{user_id}")] //GET: user/account/{user_id}
        public ActionResult GetAccountInfo(int? user_id)
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
        [Route("update/account")] //PUT: user/update/account
        public ActionResult UpdateAccount(UserInfoUpdate userInfo)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var user = db.Users.Find(userInfo.user_id);

                    if (!string.IsNullOrEmpty(userInfo.Username) && user.Username != userInfo.Username)
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
        [Route("delete/account/soft/{user_id}")] //DELETE: user/delete/account/soft/{user_id}
        public ActionResult SoftDeleteAccount(int user_id)
        {
            try
            {
                var user = db.Users.Find(user_id);
                if (user == null)
                {
                    return Json(new { message = "User not found" }, JsonRequestBehavior.AllowGet);
                }

                user.IsDeleted = true;
                user.DeletedAt = DateTime.UtcNow;
                db.SaveChanges();

                return Json(new { message = "User marked as deleted" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }



    }
}