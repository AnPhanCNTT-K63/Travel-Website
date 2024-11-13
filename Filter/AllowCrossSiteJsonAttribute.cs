using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebBackendProject.Filter
{
    public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Origin", "*");
            filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            base.OnActionExecuting(filterContext);
        }
    }
}