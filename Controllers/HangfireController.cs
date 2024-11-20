using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebBackendProject.Controllers
{
    public class HangfireController : Controller
    {
        // GET: Hangfire
        public ActionResult ShowProcess()
        {
            return Redirect("/hangFire");
        }
    }
}