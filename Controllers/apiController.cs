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

        [HttpGet] // https://localhost:44331/api/tourDetail/?id={id}
        public ActionResult tourDetail(int id)
        {
            var row = db.Tours.Where(model => model.id == id);
            return Json(row, JsonRequestBehavior.AllowGet);
        }

        [HttpPost] // api/signup
        public ActionResult signup(User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
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
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost] // api/signin
        public ActionResult signin(User user) {
            var loginUser = db.Users.FirstOrDefault(model => model.email == user.email);
            if(loginUser == null)
            {
                return Json(new { message = "Not Found" });
            }
            else if (loginUser.password != user.password)
            {
                return Json(new { message = "Incorrect Password" });
            }
            else
            {
                return Json(loginUser, JsonRequestBehavior.AllowGet);
            }
            
        }

        [HttpGet]
        public ActionResult temp()
        {
            var users = db.Users.ToList();
            db.Users.RemoveRange(users);
            db.SaveChanges();

            return Json(new { success = true, message = "All users have been removed." }, JsonRequestBehavior.AllowGet);
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
            Debug.WriteLine("Here");
            return Json(new {haha = "haha"}, JsonRequestBehavior.AllowGet);
        }
       
    }
}