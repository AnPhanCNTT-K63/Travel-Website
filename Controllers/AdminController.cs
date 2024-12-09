using System;
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity;

using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("admin")]
    public class AdminController : Controller
    {
        DbAppContext db = new DbAppContext();

        [HttpPatch]
        [Route("ban")] //PATCH: admin/ban
        public ActionResult BanUser(int user_id) // Chặn user
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
        [Route("unban")] //PATCH: admin/unban
        public ActionResult UnbanUser(int user_id) //Bỏ chặn user
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
        [Route("get/banned")] //GET: admin/get/banned
        public ActionResult BannedUser() //Lấy user bị chặn
        {
            var users = db.Users
                .Where(u => u.IsBanned == true)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get/online")] //GET: admin/get/online
        public ActionResult OnlineUser() //Lấy user đang online
        {
            var users = db.Users
                .Where(u => u.IsOnline == true)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get/offline")] //GET: admin/get/offline
        public ActionResult OfflineUser() //Lấy user đang offline
        {
            var users = db.Users
                .Where(u => u.IsOnline == false)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpPatch]
        [Route("block/profile")] //PATCH: admin/block/profile
        public ActionResult BlockProfile(int user_id) //Khóa trang cá nhân
        {
            var user = db.Users.Find(user_id);
            user.IsProfileBlocked = true;
            db.SaveChanges();

            return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPatch]
        [Route("unblock/profile")] //PATCH: admin/unblock/profile
        public ActionResult UnBlockProfile(int user_id) // Mở khóa trang cá nhân cho user
        {
            var user = db.Users.Find(user_id);
            user.IsProfileBlocked = false;
            db.SaveChanges();

            return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get/profile/block")] //GET: admin/get/profile/block
        public ActionResult ProfileBlockUser() //Lấy user bị khóa trang cá nhân
        {
            var users = db.Users
                .Where(u => u.IsProfileBlocked == true)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get/deleted/soft")] //GET: admin/get/deleted/soft
        public ActionResult DeletedSoftUser() // Xóa mềm account của user
        {
            var users = db.Users
                .Where(u => u.IsDeleted == true)
                .ToList();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        [Route("delete/permanently/{user_id}")] //DELETE: admin/delete/permanently/{user_id}
        public ActionResult DeleteAccount(int user_id) //Xóa account
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

        [HttpPost]
        [Route("restore/account")] //POST: admin/restore/account
        public ActionResult RestoreAccount(int user_id) //Khôi phục tài khoản (đối với account đang xóa mềm)
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


        [HttpGet]
        [Route("users/{id}")] //GET: admin/users/{id}
        public ActionResult UserById(int id) //Lấy user theo Id
        {
            var data = db.Users.Find(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("request/payment")] //GET: admin/request/payment
        public ActionResult GetUserPaymentRequest() //Lấy toàn yêu cầu thanh toán của user
        {
            return GetPaymentRequests(null);
        }

        [HttpGet]
        [Route("request/payment/pending")] //GET: admin/request/payment/pending
        public ActionResult GetPendingPayment() //Lấy yêu cầu thanh toán đang thực thi
        {
            return GetPaymentRequests("waiting");
        }

        [HttpGet]
        [Route("request/payment/processed")] //GET: admin/request/payment/processed
        public ActionResult GetProcessedPayment() //Lấy yêu cầu đã được xử lý
        {
            return GetPaymentRequests(new[] { "success", "fail" });
        }

        [HttpGet]
        [Route("request/payment/accepted")] //GET: admin/request/payment/accepted
        public ActionResult GetAcceptedPayment() //Lấy yêu cầu thanh toán đã chấp thuận
        {
            return GetPaymentRequests("success");
        }

        [HttpGet]
        [Route("request/payment/unaccepted")] //GET: admin/request/payment/unaccepted
        public ActionResult GetNotAcceptedPayment() //Lấy yêu cầu thanh toán không đã chấp thuận
        {
            return GetPaymentRequests("fail");
        }

        private ActionResult GetPaymentRequests(object statusFilter) //Hàm helper lấy yêu cầu thanh toán
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
                    .Where(b => b.Status != "pending")
                    .Select(b => new
                    {
                        User_Id = b.User.Id,
                        User_Name = b.User.Username,
                        Booking_Date = b.CreatedAt.Value.ToLocalTime().ToString("MMMM dd, yyyy hh:mm tt"),
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

        [HttpGet]
        [Route("statistics/register/{year}")] //GET: admin/statistics/register/{year}
        public ActionResult RegisterStatistics(int year) //Lấy dữ liệu người dùng đăng ký mỗi tháng trong năm 
        {
            var registerUsersPerMonth = db.Users
                .Where(u => u.CreatedAt.Value.Year == year)
                .GroupBy(u => u.CreatedAt.Value.Month)
                .Select(u => new
                {
                    RegisterMonth = u.Key,
                    RegisterCount = u.Count()
                })
                .OrderBy(b => b.RegisterMonth)
                .ToList();

            var result = new { registerUsersPerMonth };

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}