using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class TourController : Controller 
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        public ActionResult tours() //GET: /Tour/tours
        {
            var data = db.Tours.ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [JwtAuthorize("admin")]
        [HttpPost]
        public ActionResult tourAndPackagesCreate(Tour tour, List<TourPackage> tourPackages, int user_id) //POST: /Tour/create/tourAndPackages
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = db.Users.Find(user_id);
                    tour.User = user;
                    tour.CreatedAt = DateTime.UtcNow;
                    tour.UpdateAt = DateTime.UtcNow;
                    db.Tours.Add(tour);
                    db.SaveChanges();

                    foreach (TourPackage package in tourPackages)
                    {
                        package.Tour = tour;
                        package.CreatedAt = DateTime.UtcNow;
                        package.UpdatedAt = DateTime.UtcNow;
                        db.TourPackages.Add(package);
                    }
                    db.SaveChanges();
                }
                else
                {
                    return Json(new { message = "Invalid Object" }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = "Error Create Tour and Packages: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
           

        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        public ActionResult tourDetail(int id) //GET: /Tour/detail/tour/{id}
        {
            var row = db.Tours.FirstOrDefault(model => model.Id == id);
            return Json(row, JsonRequestBehavior.AllowGet);
        }

    }
}