using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    public class HomeController : Controller
    {
       DbAppContext db = new DbAppContext();
        // GET: Home
        public ActionResult Index()
        {
            var data = db.Tours.FirstOrDefault();
            return View(data);
        }

        //GET: Create
        public ActionResult Create() { return View(); }

    }
}