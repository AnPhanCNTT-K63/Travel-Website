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
    }
}