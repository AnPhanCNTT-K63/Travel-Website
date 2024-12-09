using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;
using WebBackendProject.Models.DTO;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("payment")]
    public class PaymentController : Controller
    {
        DbAppContext db = new DbAppContext();

        [HttpGet]
        [Route("card/{userId}")] //GET: payment/card/{userId}
        public ActionResult GetPaymentCard(int userId)
        {
            var card = db.PaymentCards
                .Where(c => c.User.Id == userId)
                .Select(c => c)
                .ToList();

            return Json(card, JsonRequestBehavior.AllowGet);
        }

        private string GenerateTransactionId()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            return new string(Enumerable.Repeat(chars, 12)
                                        .Select(s => s[random.Next(s.Length)]).ToArray());
        }


        [HttpPost]
        [Route("create/info")] //POST: payment/create/info
        public ActionResult createPaymentInfo(PaymentInfo info)
        {
            Payment payment = new Payment
            {
                PaymentDate = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                PaymentMethod = info.PaymentMethod,
                PaymentStatus = info.PaymentStatus,
                PaymentAmount = info.PaymentAmount,
                TransactionId = "#" + GenerateTransactionId(),
                BookingId = info.BookingId
            };

            db.Payments.Add(payment);
            db.SaveChanges();

            return Json(new { message = "Success" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPatch]
        [Route("update/status")] //PATCH: payment/update/status
        public ActionResult SetPaymentStatus(int bookingId, string status)
        {
            try
            {
                if (string.IsNullOrEmpty(status))
                {
                    return Json(new { message = "Status cannot be null or empty." }, JsonRequestBehavior.AllowGet);
                }

                var payment = new Payment { BookingId = bookingId };

                db.Payments.Attach(payment);

                payment.PaymentStatus = status;

                db.Entry(payment).Property(b => b.PaymentStatus).IsModified = true;

                db.SaveChanges();

                return Json(new { message = "Success" }, JsonRequestBehavior.AllowGet);
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
        [Route("statistics/{year}")] //GET: payment/statistics/{year}
        public ActionResult BookingStatistics(int year)
        {
            var totalPayment = db.Payments
                .Where(p => p.PaymentDate.Year == year)
                .Count();

            var totalPaymentPerMonth = db.Payments
                .Where(p => p.PaymentDate.Year == year)
                .GroupBy(b => b.PaymentDate.Month)
                .Select(b => new
                {
                    PaymentMonth = b.Key,
                    PaymentCount = b.Count()
                })
                .OrderBy(b => b.PaymentMonth)
                .ToList();

            var PaymentSuccessPerMonth = db.Payments
                .Where(b => b.PaymentStatus == "success" && b.PaymentDate.Year == year)
                .GroupBy(b => b.PaymentDate.Month)
                .Select(b => new
                {
                    PaymentMonth = b.Key,
                    PaymentCount = b.Count()
                })
                .OrderBy(b => b.PaymentMonth)
                .ToList();

            var PaymentFailPerMonth = db.Payments
                .Where(b => b.PaymentStatus == "fail" && b.PaymentDate.Year == year)
                .GroupBy(b => b.PaymentDate.Month)
                .Select(b => new
                {
                    PaymentMonth = b.Key,
                    PaymentCount = b.Count()
                })
                .OrderBy(b => b.PaymentMonth)
                .ToList();


            var result = new { totalPayment, totalPaymentPerMonth, PaymentSuccessPerMonth, PaymentFailPerMonth };

            return Json(result, JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        [Route("statistics/revenue/{year}")] //GET: payment/statistics/revenue/{year}
        public ActionResult RevenueStatistics(int year)
        {
            var totalRevenue = db.Payments
                .Where(p => p.PaymentDate.Year == year)
                .Sum(p => p.PaymentAmount);

            var revenuePerMonth = db.Payments
                .Where(p => p.PaymentDate.Year == year)
                .GroupBy(p => p.PaymentDate.Month)
                .Select(p => new
                {
                    Month = p.Key,
                    Revenue = p.Sum(s => s.PaymentAmount)
                });

            var revenuePerYear = db.Payments
                .GroupBy(r => r.PaymentDate.Year)
                .Select(p => new
                {
                    Year = p.Key,
                    Revenue = p.Sum(s => s.PaymentAmount)
                });

            var result = new { totalRevenue, revenuePerMonth, revenuePerYear };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

      
    }
}