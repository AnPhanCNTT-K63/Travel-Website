using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("tour")]
    public class TourController : Controller 
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        [Route("tours")] // GET: /tour/tours
        public ActionResult Tours() 
        {
            var toursWithMinPrice = db.Tours
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    MinPrice = db.TourPackages
                        .Where(tp => tp.Tour.Id == t.Id)
                        .Min(tp => (decimal?)tp.Price) 
                        ?? 0 
                })
                .ToList();

            return Json(toursWithMinPrice, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("create")] //POST: /tour/create
        public ActionResult TourAndPackagesCreate(Tour tour, List<TourPackage> tourPackages, int user_id) 
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

        [HttpGet]
        [Route("detail/{id}")] //GET: /tour/detail/{id}
        public ActionResult TourDetail(int id) 
        {
            var row = db.Tours.FirstOrDefault(model => model.Id == id);
            return Json(row, JsonRequestBehavior.AllowGet);
        }

    }
}