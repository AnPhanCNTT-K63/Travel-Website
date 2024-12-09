using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("card")]
    public class PaymentCardController : Controller
    {
        DbAppContext db = new DbAppContext();

        [HttpPost]
        [Route("store/address")] //POST: card/store/address
        public ActionResult StoreBillingAddress(int user_id, string billingAddress)
        {
            var cards = db.PaymentCards.Where(c => c.User.Id == user_id);

            if (!cards.Any())
            {
                return Json(new { message = "No cards found" }, JsonRequestBehavior.AllowGet);
            }

            foreach (var card in cards)
            {
                card.BillingAddress = billingAddress;
            }
            db.SaveChanges();

            return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("get")] //GET: card/get
        public ActionResult getCardByUserId(int user_id)
        {
            var card = db.PaymentCards.Where(c => c.User.Id == user_id)
                .Select(p => new
                {
                    p.Last4Digits,
                    p.CardholderName,
                    p.ExpirationDate,
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                }).FirstOrDefault();
            return Json(card, JsonRequestBehavior.AllowGet);
        }
    }
}