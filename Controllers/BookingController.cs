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
    public class BookingController : Controller
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        public ActionResult getBookingInfo(int? tourPackageId) // GET: Booking/info/{tourPackage_id}
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
        public ActionResult getContactInfo(int? user_id) //GET: Booking/contact/info/{user_id}
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
        public ActionResult storeBookingInfo(BookingInfo info, int User_Id)
        {
            try
            {
                var booking = info.Booking;
                var user = db.Users.Find(User_Id);
                booking.User = user;
                booking.CreatedAt = DateTime.UtcNow;
                booking.UpdatedAt = DateTime.UtcNow;
                booking.Status = "Pending";
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

                return Json(new {message = "Success"}, JsonRequestBehavior.AllowGet);
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
                .Where(b => b.User.Id == userId)
                .Select(b => b).ToList();

            var myBookings = new List<MyBooking>();

            foreach(var booking in bookings)
            {
                var mappedBooking = new MyBooking
                {
                    Id = booking.Id,
                    Name = booking.TourPackage.Name,
                    Price = booking.TourPackage.Price,
                    Status = booking.Status,
                };

                myBookings.Add(mappedBooking);
            }

            return myBookings;
        }

        [HttpGet]
        public ActionResult getMyBooking(int userId) //GET: Booking/user/{userId}
        {
            var bookings = setMyBooking(userId);
            return Json(bookings, JsonRequestBehavior.AllowGet);
        }



    }
}