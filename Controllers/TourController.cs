using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class TourController : Controller //Tour/
    {
        DbAppContext db = new DbAppContext();


        [HttpGet]
        public ActionResult tours() //GET: /Tour/tours
        {
            var data = db.Tours.ToList();
            Debug.Write(">??");
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("User")]
        [HttpPost]
        public ActionResult tourCreate(Tour tour) //POST: /Tour/tourCreate
        {
            if (ModelState.IsValid)
            {
                db.Tours.Add(tour);
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
        public ActionResult tourDetail(int id) //GET: /Tour/tourDetail/{id}
        {
            var row = db.Tours.FirstOrDefault(model => model.Id == id);
            return Json(row, JsonRequestBehavior.AllowGet);
        }

       /* [JwtAuthorize("user")]
        [HttpPost]
        public ActionResult creatPost(BlogPost blogPost)
        {
            return Json(new { haha = "kaka", JsonRequestBehavior.AllowGet });
        }*/


}
}