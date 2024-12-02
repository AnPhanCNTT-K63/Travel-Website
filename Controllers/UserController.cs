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

        [HttpGet]
        [Route("users/{id}")] //GET: user/users/{id}
        public ActionResult UserById(int id)
        {
            var data = db.Users.Find(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("profile")]
        public ActionResult UserProfile()
        {
            var data = db.UserProfiles.ToList();
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

        [HttpPost]
        [Route("restore/account")] //POST: user/restore/account
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
                user.DeletedAt = null;
                db.SaveChanges();

                return Json(new { message = "User restored successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpDelete]
        [Route("delete/permanently/{user_id}")] //DELETE: user/delete/permanently/{user_id}
        public ActionResult DeleteAccount(int user_id)
        {
            try
            {
                var user = db.Users
                 .Include(u => u.UserProfile)
                 .FirstOrDefault(u => u.Id == user_id);
                db.UserProfiles.Remove(user.UserProfile);
                db.Users.Remove(user);
                db.SaveChanges();

                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
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

            [HttpGet]
        [Route("request/payment")] //GET: user/request/payment
        public ActionResult GetUserPaymentRequest() 
        {
            return GetPaymentRequests(null);
        }

        [HttpGet]
        [Route("request/payment/pending")] //GET: user/request/payment/pending
        public ActionResult GetPendingPayment() 
        {
            return GetPaymentRequests("waiting");
        }

        [HttpGet]
        [Route("request/payment/processed")] //GET: user/request/payment/processed
        public ActionResult GetProcessedPayment() 
        {
            return GetPaymentRequests(new[] { "success", "fail" });
        }

        [HttpGet]
        [Route("request/payment/accepted")] //GET: user/request/payment/accepted
        public ActionResult GetAcceptedPayment() 
        {
            return GetPaymentRequests("success");
        }

        [HttpGet]
        [Route("request/payment/unaccepted")] //GET: user/request/payment/unaccepted
        public ActionResult GetNotAcceptedPayment() 
        {
            return GetPaymentRequests("fail");
        }

        private ActionResult GetPaymentRequests(object statusFilter)
        {
            try
            {
                var query = db.Bookings
                    .Include(b => b.User)
                    .Include(b => b.Payment)
                    .Include(b => b.TourPackage);

                if (statusFilter is string singleStatus)
                {
                    query = query.Where(b => b.Status == singleStatus);
                }
                else if (statusFilter is string[] multipleStatuses)
                {
                    query = query.Where(b => multipleStatuses.Contains(b.Status));
                }
                else
                {
                    query = query.Where(b => b.Status != "cancel");
                }

                var bookings = query
                    .ToList()
                    .Select(b => new
                    {
                        User_Id = b.User.Id,
                        User_Name = b.User.Username,
                        Booking_Date = b.BookingDate.ToLocalTime().ToString("MMMM dd, yyyy hh:mm tt"),
                        Booking_Id = b.Id,
                        TourPackage_Id = b.TourPackageId,
                        TourPackage_Name = b.TourPackage.Name,
                        Total_Price = b.Payment.PaymentAmount,
                        Payment_Method = b.Payment.PaymentMethod,
                        Payment_Status = b.Payment.PaymentStatus,
                    }).ToList();

                return Json(bookings, JsonRequestBehavior.AllowGet);
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

        [HttpPatch]
        [Route("ban")] //PATCH: user/ban
        public ActionResult BanUser(int user_id)
        {
            try
            {
                var user = db.Users.Find(user_id);

                if (user == null)
                {
                    return Json(new { message = "User not found" }, JsonRequestBehavior.AllowGet);
                }

                user.IsBanned = true;
                db.SaveChanges();

                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPatch]
        [Route("unban")] //PATCH: user/unban
        public ActionResult UnbanUser(int user_id)
        {
            try
            {
                var user = db.Users.Find(user_id);

                if (user == null)
                {
                    return Json(new { message = "User not found" }, JsonRequestBehavior.AllowGet);
                }

                user.IsBanned = false;
                db.SaveChanges();

                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [Route("get/deleted/soft")] //GET: user/get/deleted/soft
        public ActionResult DeletedSoftUser()
        {
            var users = db.Users
                .Where(u => u.IsDeleted == true)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get/banned")] //GET: user/get/banned
        public ActionResult BannedUser()
        {
            var users = db.Users
                .Where(u => u.IsBanned == true)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get/online")] //GET: user/get/online
        public ActionResult OnlineUser()
        {
            var users = db.Users
                .Where(u => u.IsOnline == true)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get/offline")] //GET: user/get/offline
        public ActionResult OfflineUser()
        {
            var users = db.Users
                .Where(u => u.IsOnline == false)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpPatch]
        [Route("block/profile")] //PATCH: user/block/profile
        public ActionResult BlockProfile(int user_id)
        {
            var user = db.Users.Find(user_id);
            user.IsProfileBlocked = true;
            db.SaveChanges();

            return Json(new {message = "success"}, JsonRequestBehavior.AllowGet);
        }

        [HttpPatch]
        [Route("unblock/profile")] //PATCH: user/unblock/profile
        public ActionResult UnBlockProfile(int user_id)
        {
            var user = db.Users.Find(user_id);
            user.IsProfileBlocked = false;
            db.SaveChanges();

            return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
        }


    }
}