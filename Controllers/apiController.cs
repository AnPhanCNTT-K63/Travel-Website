using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class apiController : Controller
    {
        DbAppContext db = new DbAppContext();
        // GET: api
        [HttpGet] // https://localhost:44331/api/tours
        public ActionResult tours()
        {
            var data = db.Tours.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult tourDetail(int id)// https://localhost:44331/api/tourDetail/?id={id}
        {
            var row = db.Tours.Where(model => model.id == id);
            return Json(row, JsonRequestBehavior.AllowGet);
        }


        [HttpPost] // api/tours
        public ActionResult tours(Tour tour)
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
            Debug.WriteLine("Entering tours action");
            return Json(new {haha = "haha"}, JsonRequestBehavior.AllowGet);
        }
       
    }
}