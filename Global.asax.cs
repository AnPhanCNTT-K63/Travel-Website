using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http.Cors;
using System.Web;
using WebBackendProject.App_Start;

namespace WebBackendProject
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Enable CORS globally
            var cors = new EnableCorsAttribute("http://localhost:3000", "*", "*");
            GlobalConfiguration.Configuration.EnableCors(cors);  // Enable CORS for all controllers

            // Register all areas, routes, and Web API configuration
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            WebApiConfig.Register(GlobalConfiguration.Configuration);
        }

        // Handle preflight requests (OPTIONS)
        protected void Application_BeginRequest()
        {
            // Allow only the specific origin
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:3000");

            // Allow common methods
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

            // Allow the headers you need (for example, Authorization, Content-Type)
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

            // Handle the preflight (OPTIONS) request
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.StatusCode = 200; // OK response for preflight
                HttpContext.Current.Response.End();
            }
        }

    }
}
