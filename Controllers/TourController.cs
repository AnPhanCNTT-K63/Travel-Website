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
        [Route("tours/{page}/{pageSize}")] // GET: tour/tours/{page}/{pageSize}
        public ActionResult Tours(int page, int pageSize)
        {
            var query = db.Tours
                .Where(t => t.IsDeleted == false);
            var toursWithMinPrice = query
                .OrderBy(t => t.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
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
                    t.DeletedAt,
                    t.IsDeleted,
                    t.Opening,
                    t.Ending,
                    MinPrice = db.TourPackages
                        .Where(tp => tp.Tour.Id == t.Id)
                        .Min(tp => (decimal?)tp.Price) ?? 0
                })
                .ToList();

            int totalTours = query.Count();

            return Json(new
            {
                tours = toursWithMinPrice,
                totalTours = totalTours,
                totalPages = (int)Math.Ceiling((double)totalTours / pageSize)
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
                var row = db.Tours
                    .Where(t => t.Id == id)
                    .Select(t => new
                    {
                        t.Id,
                        t.Name,
                        t.Description,
                        t.Region,
                        t.City,
                        t.Country,
                        t.Opening,
                        t.Image,
                        t.Ending,
                        t.CreatedAt,
                        t.UpdateAt,
                        t.User.UserProfile.FirstName, t.User.UserProfile.LastName,
                        t.UserId,
                    }).FirstOrDefault();
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
                .Where(t => t.User.Id == user_id && t.IsDeleted == false)
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

        [HttpPut]
        [Route("update")] //PUT: tour/update
        public ActionResult UpdateTourAndPackages(Tour tour, List<TourPackage> tourPackages, int user_id)
        {

            try
            {
                var existingTour = db.Tours.Find(tour.Id);
                var user = db.Users.Find(user_id);

                if (existingTour == null || user == null)
                {
                    return Json(new { message = "Tour or User not found" }, JsonRequestBehavior.AllowGet);
                }

                existingTour.Name = tour.Name;
                existingTour.Region = tour.Region;
                existingTour.Country = tour.Country;
                existingTour.City = tour.City;
                existingTour.Image = tour.Image;
                existingTour.Opening = tour.Opening;
                existingTour.Ending = tour.Ending;
                existingTour.User = user;
                existingTour.UpdateAt = DateTime.UtcNow;

                db.SaveChanges();

                var existingPackages = db.TourPackages.Where(t => t.Tour.Id == tour.Id).ToList();
                var incomingPackageIds = tourPackages.Select(tp => tp.Id).ToList();

                var packagesToDelete = existingPackages
                    .Where(ep => !incomingPackageIds.Contains(ep.Id))
                    .ToList();

                foreach (var package in packagesToDelete)
                {

                    var packageDelete = db.TourPackages.Include(p => p.Bookings.Select(b => b.Contact))
                                              .Include(p => p.Bookings.Select(b => b.Payment))
                                              .FirstOrDefault(p => p.Id == package.Id);

                    var bookingsToRemove = packageDelete.Bookings.ToList();

                    foreach (var booking in bookingsToRemove)
                    {
                        if (booking.Payment != null)
                        {
                            db.Payments.Remove(booking.Payment);
                        }

                        if (booking.Contact != null)
                        {
                            db.Contacts.Remove(booking.Contact);
                        }

                        db.Bookings.Remove(booking);
                    }

                    db.TourPackages.Remove(packageDelete);
                }
                db.SaveChanges();
                foreach (var package in tourPackages)
                {
                    var existingPackage = db.TourPackages.Find(package.Id);

                    if (existingPackage == null)
                    {
                        var newPackage = new TourPackage
                        {
                            Name = package.Name,
                            Image = package.Image,
                            Price = package.Price,
                            Activities = package.Activities,
                            IsChangeSchedule = package.IsChangeSchedule,
                            IsRefund = package.IsRefund,
                            CheckIn = package.CheckIn,
                            VAT = package.VAT,
                            Quantity = package.Quantity,
                            Description = package.Description,
                            Tour = existingTour,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        };
                        db.TourPackages.Add(newPackage);
                    }
                    else
                    {
                        existingPackage.Name = package.Name;
                        existingPackage.Description = package.Description;
                        existingPackage.Image = package.Image;
                        existingPackage.Price = package.Price;
                        existingPackage.Activities = package.Activities;
                        existingPackage.IsChangeSchedule = package.IsChangeSchedule;
                        existingPackage.IsRefund = package.IsRefund;
                        existingPackage.CheckIn = package.CheckIn;
                        existingPackage.VAT = package.VAT;
                        existingPackage.Quantity = package.Quantity;
                        existingPackage.Tour = existingTour;
                        existingPackage.UpdatedAt = DateTime.UtcNow;
                    }
                }

                db.SaveChanges();


                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpDelete]
        [Route("delete/package")] // DELETE: tour/delete/package
        public ActionResult DeleteTourPackage(int id)
        {
            try
            {
                var package = db.TourPackages.Include(p => p.Bookings.Select(b => b.Contact))
                                              .Include(p => p.Bookings.Select(b => b.Payment))
                                              .FirstOrDefault(p => p.Id == id);

                if (package == null)
                {
                    return Json(new { message = "Tour Package not found" }, JsonRequestBehavior.AllowGet);
                }

                var bookingsToRemove = package.Bookings.ToList();

                foreach (var booking in bookingsToRemove)
                {
                    if (booking.Payment != null)
                    {
                        db.Payments.Remove(booking.Payment);
                    }

                    if (booking.Contact != null)
                    {
                        db.Contacts.Remove(booking.Contact);
                    }

                    db.Bookings.Remove(booking);
                }

                db.TourPackages.Remove(package);

                db.SaveChanges();

                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPatch]
        [Route("delete/soft")] //PATCH: tour/delete/soft
        public ActionResult DeleteSoftTour(int id)
        {
            try
            {
                var tour = new Tour { Id = id };

                db.Tours.Attach(tour);

                tour.IsDeleted = true;
                tour.DeletedAt = DateTime.UtcNow;

                db.Entry(tour).Property(b => b.IsDeleted).IsModified = true;
                db.Entry(tour).Property(b => b.DeletedAt).IsModified = true;

                db.SaveChanges();
                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        [Route("get/deleted")] //GET: tour/get/deleted
        public ActionResult GetDeletedTour()
        {
            try
            {
                var tours = db.Tours
                .Where(t => t.IsDeleted == true)
                .ToList();
                return Json(tours, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpDelete]
        [Route("delete/permanently/{id}")] //DELETE: tour/delete/permanently/{id}
        public ActionResult DeleteTour(int id)
        {
            try
            {
                var tourDelete = db.Tours.Find(id);

                db.Tours.Remove(tourDelete);
                db.SaveChanges();
                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPatch]
        [Route("restore")]  //PATCH: tour/restore
        public ActionResult RestorePost(int id)
        {
            try
            {
                var tour = new Tour { Id = id };

                db.Tours.Attach(tour);

                tour.IsDeleted = false;
                tour.DeletedAt = null;

                db.Entry(tour).Property(b => b.IsDeleted).IsModified = true;
                db.Entry(tour).Property(b => b.DeletedAt).IsModified = true;

                db.SaveChanges();

                return Json(new { message = "success" }, JsonRequestBehavior.AllowGet);
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
        [Route("stars/{tour_id}")]  // GET: tour/stars/{tour_id}
        public ActionResult TourStars(int tour_id)
        {
            try
            {
                var averageStar = db.TourPackages
                    .Where(t => t.Tour.Id == tour_id)
                    .Select(t => t.TourReviews
                        .Average(rv => rv.Star)
                    )
                    .FirstOrDefault();

                if (averageStar == null)
                {
                    return Json(0, JsonRequestBehavior.AllowGet);
                }

                return Json(averageStar, JsonRequestBehavior.AllowGet);
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
        [Route("review/{tour_id}")]  //GET: tour/review/{tour_id}
        public ActionResult Reviews(int tour_id)
            {
            try
            {
                var reviews = db.TourReviews
                                .Include(r => r.TourPackage)
                                .Include(r => r.User)
                                .Where(t => t.TourPackage.TourId == tour_id)
                                .Select(r => new
                                {
                                    r.Review,
                                    r.Star,
                                    r.TourPackage.Name,
                                    r.User.UserProfile.FirstName,
                                    r.User.UserProfile.LastName,
                                });
                return Json(reviews, JsonRequestBehavior.AllowGet);
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