using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("package")]
    public class TourPackageController : Controller
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        [Route("packages")] //GET: /package/packages
        public ActionResult TourPackages() 
        {
            var data = db.TourPackages.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        public ActionResult tourPackageDetail(int id) //GET: /TourPackage/detail/tourPackage/{id}
        {
            var tourPackage = db.TourPackages.FirstOrDefault(model => model.Id == id);
            return Json(tourPackage, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("vouchers/{id}")] //GET: /package/vouchers/{id}
        public ActionResult GetVoucher(int? id) 
        {
            var vouchers = db.Vouchers
                .Where(v => v.TourPackage.Id == id)
                .Select(v => new
                {
                    v.Code,
                    v.Title,
                    v.Discount
                }) 
                .ToList();

            if (!vouchers.Any())
            {
                return Json(vouchers, JsonRequestBehavior.AllowGet);
            }

            return Json( vouchers , JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        [Route("VAT/{id}")] //GET: /package/VAT/{id}
        public ActionResult GetVat(int id) 
        {
            var vat = db.TourPackages
                .Where(t => t.Id == id)
                .Select(t => t.VAT)
                .FirstOrDefault();

            if (vat == 0)
            {
                return Json(new { message = "No VAT" }, JsonRequestBehavior.AllowGet);
            }

            return Json(vat, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("package/{tour_id}")] //GET: package/package/{tour_id}
        public ActionResult PackageByTourId(int tour_id)
        {
            try
            {
                var packages = db.TourPackages
                    .Where(p => p.Tour.Id == tour_id)
                    .ToList();


                return Json(packages, JsonRequestBehavior.AllowGet);
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