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
             BookingId = info.BookingId
            };

            db.Payments.Add(payment);
            db.SaveChanges();            

            return Json(new {message = "Success"}, JsonRequestBehavior.AllowGet);
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

      

    }
}