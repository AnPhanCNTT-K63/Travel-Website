using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class TourPackageController : Controller
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        public ActionResult tourPackages() //GET: /TourPackage/tourPackages
        {
            var data = db.TourPackages.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin")]
        [HttpPost]
        public ActionResult tourCreate(TourPackage tourPackage) //POST: /TourPackage/create/tourPackage
        {
            if (ModelState.IsValid)
            {
                tourPackage.CreatedAt = DateTime.UtcNow;
                tourPackage.UpdatedAt = DateTime.UtcNow;
                db.TourPackages.Add(tourPackage);
                int a = db.SaveChanges();
                if (a > 0)
                {
                    Debug.WriteLine("True");
                }
                else
                {
                    Debug.WriteLine("False");
                }
            }
            Debug.WriteLine("Here");
            return Json(new { haha = "haha" }, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        public ActionResult tourPackageDetail(int id) //GET: /TourPackage/detail/tourPackage/{id}
        {
            var tourPackage = db.TourPackages.FirstOrDefault(model => model.Id == id);
            return Json(tourPackage, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult tourPackageVoucher(int? id) //GET: /TourPackage/vouchers/{id}
        {

            var vouchers = db.Vouchers
        .Where(v => v.TourPackage.Id == id)
        .Select(v => v)
        .ToList();

            if (!vouchers.Any())
            {
                return Json(new { message = "No voucher" }, JsonRequestBehavior.AllowGet);
            }

            return Json(vouchers, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetVat(int id) //GET: /TourPackage/VAT/{id}
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

    }
}