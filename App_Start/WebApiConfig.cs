using System.Web.Http;
using System.Web.Http.Cors;

namespace WebBackendProject.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Enable CORS for your specific frontend domain
            var cors = new EnableCorsAttribute("http://localhost:3000", "*", "Authorization");
            config.EnableCors(cors);

            // Register your Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
