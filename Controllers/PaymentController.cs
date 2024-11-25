using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;
using WebBackendProject.Models.DTO;

namespace WebBackendProject.Controllers
{
    public class PaymentController : Controller
    {
        DbAppContext db = new DbAppContext();

        [HttpGet]
        public ActionResult getPaymentCard(int userId) //GET: Payment/card/{userId}
        {
            var card = db.PaymentCards
                .Where(c => c.User.Id == userId)
                .Select(c => c)
                .ToList();

            return Json(card, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult storePaymentInfo(PaymentInfo info) //POST: Payment/store
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



            var result = new { payment };
            

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        
    }
}