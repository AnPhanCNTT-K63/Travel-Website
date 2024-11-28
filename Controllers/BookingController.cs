using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using WebBackendProject.Models;
using WebBackendProject.Models.DTO;
using System.Diagnostics;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("booking")]
    public class BookingController : Controller
    {
        DbAppContext db = new DbAppContext();

        [HttpGet]
        public ActionResult bookings() // GET: Booking/bookings
        {
            try
            {
                var bookings = db.Bookings.ToList();
                return Json(bookings, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Exception = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("info/{tourPackageId}")] //GET: booking/info/{tourPackage_id}
        public ActionResult GetBookingInfo(int? tourPackageId) 
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

        [HttpGet]
        [Route("contact/{user_id}")] //GET: booking/contact/{user_id}
        public ActionResult GetContactInfo(int? user_id) 
        {
            try
            {
                var data = db.Users
                    .Include(d => d.UserProfile)
                    .Where(d => d.Id == user_id)
                    .Select(d => new
                    {
                        Name = d.UserProfile.FirstName + " " + d.UserProfile.LastName,
                         d.UserProfile.Phone,
                         d.Email
                    }).FirstOrDefault();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Exception = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("create")] //POST: booking/create
        public ActionResult StoreBookingInfo(BookingInfo info, int User_Id) 
        {
            try
            {
                var booking = info.Booking;
                var user = db.Users.Find(User_Id);
                booking.User = user;
                booking.CreatedAt = DateTime.UtcNow;
                booking.UpdatedAt = DateTime.UtcNow;
                booking.Status = "pending";
                db.Bookings.Add(booking);
                db.SaveChanges();

                var contact = info.Contact;
                if (contact == null)
                {
                    return Json(new
                    {
                        message = "Contact information is required."
                    }, JsonRequestBehavior.AllowGet);
                }
                contact.Booking = booking;
                db.Contacts.Add(contact);

                List<Traveler> travelers = info.Traveler;

                foreach(var traveler in travelers)
                {
                    traveler.Booking = booking;
                    db.Travelers.Add(traveler);
                }

                db.SaveChanges();

                return Json(booking.Id, JsonRequestBehavior.AllowGet);
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

        private List<MyBooking> setMyBooking(int userId)
        {
            var bookings = db.Bookings
                .Include(b => b.TourPackage)
                .Where(b => b.User.Id == userId && b.IsDeleted != true)
                .Select(b => b).ToList();

            var myBookings = new List<MyBooking>();

            foreach(var booking in bookings)
            {
                var mappedBooking = new MyBooking
                {
                    Id = booking.Id,
                    TourPackageId = booking.TourPackageId,
                    Name = booking.TourPackage.Name,
                    Price = booking.TourPackage.Price,
                    Status = booking.Status,
                };

                myBookings.Add(mappedBooking);
            }

            return myBookings;
        }

        [HttpGet]
        [Route("user/{userId}")] //GET: booking/user/{userId}
        public ActionResult GetMyBooking(int userId) 
        {
            var bookings = setMyBooking(userId);
            return Json(bookings, JsonRequestBehavior.AllowGet);
        }

        [HttpPatch]
        [Route("update/status")] //PATCH: booking/update/status
        public ActionResult SetStatus(int bookingId, string status) 
        {
            try
            {
                if (string.IsNullOrEmpty(status))
                {
                    return Json(new { message = "Status cannot be null or empty." }, JsonRequestBehavior.AllowGet);
                }

                var booking = new Booking { Id = bookingId };

                db.Bookings.Attach(booking);

                booking.Status = status;

                db.Entry(booking).Property(b => b.Status).IsModified = true;

                db.SaveChanges();

                return Json(new { message = "Success" }, JsonRequestBehavior.AllowGet);
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

        [HttpPost]
        [Route("check/status")] //POST: booking/check/status
        public ActionResult CheckStatusPending(int User_Id) 
        {
            try
            {
                var bookings = db.Bookings.Include(b => b.User).Where(b => b.User.Id == User_Id);

                if (bookings == null)
                {
                    return Json(new { message = "No booking Pending" }, JsonRequestBehavior.AllowGet);

                }
                foreach (var booking in bookings)
                {
                    if (booking.Status == "pending")
                    {
                        return Json(new { message = "Has booking Pending" }, JsonRequestBehavior.AllowGet);
                    }

                }
                return Json(new { message = "No booking Pending" }, JsonRequestBehavior.AllowGet);
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

        [HttpPatch]
        [Route("delete/soft")] //PATCH: booking/delete/soft
        public ActionResult SoftDeleted(int bookingId) 
        {
            try
            {
                var booking = new Booking { Id = bookingId };

                db.Bookings.Attach(booking);

                booking.IsDeleted = true;

                db.Entry(booking).Property(b => b.IsDeleted).IsModified = true;

                db.SaveChanges();

                return Json(new { message = "Success" }, JsonRequestBehavior.AllowGet);
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