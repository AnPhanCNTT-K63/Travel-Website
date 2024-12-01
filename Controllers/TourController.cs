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
        [Route("tours")] // GET: tour/tours
        public ActionResult Tours(int page = 1, int pageSize = 9)
        {
            var toursWithMinPrice = db.Tours
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Image,
                    t.Region,
                    t.Country,
                    t.City,
                    t.CreatedAt,
                    t.UpdateAt,
                    MinPrice = db.TourPackages
                        .Where(tp => tp.Tour.Id == t.Id)
                        .Min(tp => (decimal?)tp.Price)
                        ?? 0
                })
                .OrderBy(t => t.Id)  // Sắp xếp theo ID (hoặc trường khác nếu muốn)
                .Skip((page - 1) * pageSize)  // Bỏ qua bản ghi của các trang trước
                .Take(pageSize)  // Lấy số lượng bản ghi tương ứng với pageSize
                .ToList();

            // Lấy tổng số bản ghi trong bảng để tính toán số trang
            int totalTours = db.Tours.Count();

            return Json(new
            {
                tours = toursWithMinPrice,
                totalTours = totalTours,
                totalPages = (int)Math.Ceiling((double)totalTours / pageSize)  // Tính tổng số trang
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("create")] //POST: tour/create
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
        [Route("detail/{id}")] //GET: tour/detail/{id}
        public ActionResult TourDetail(int id) 
        {
            try
            {
                var row = db.Tours.FirstOrDefault(model => model.Id == id);
                return Json(row, JsonRequestBehavior.AllowGet);
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

        [HttpGet]
        [Route("user/{user_id}")] //GET: tour/user/{user_id}
        public ActionResult TourByUserId(int user_id)
        {
            try
            {
                var tours = db.Tours
                .Where(t => t.User.Id == user_id)
                .ToList();
                return Json(tours, JsonRequestBehavior.AllowGet);
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

        [HttpGet]
        [Route("package/{tour_id}")] //GET: tour/package/{tour_id}
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

        [HttpGet]
        [Route("package/count/{tour_id}")] //GET: tour/package/count/{tour_id}
        public ActionResult CountPackageInTour(int tour_id)
        {
            try
            {
                var count = db.TourPackages
                    .Where(t => t.Tour.Id == tour_id)
                    .Count();
                return Json(count, JsonRequestBehavior.AllowGet);
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