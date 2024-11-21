using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class BookingController : Controller
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        public ActionResult getBookingInfo(int? tourPackageId) // GET: Booking/info/{tourPackage_id}
        {
            if (tourPackageId != null)
            {
                var tourPackage = db.TourPackages.Find(tourPackageId);

                var schedule = db.Schedules
            .Include(s => s.TourPackage)
            .Where(s => s.TourPackage.Id == tourPackageId)
            .Select(s => new
            {
                s.TravelDay,
                s.Quantity,
            })
            .ToList();

            var totalQuantity = schedule.Sum(s => s.Quantity);
            var formatDate = schedule.Select(s => s.TravelDay?.ToString("dd/MM/yyyy")).ToList();
                

                var result = new { tourPackage, totalQuantity, formatDate };

                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return Json(new { message = "can't get booking" }, JsonRequestBehavior.AllowGet);
        }

    }
}