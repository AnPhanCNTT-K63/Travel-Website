using System.Diagnostics;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebBackendProject.App_Start
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Enable CORS
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            // Other Web API configuration...
        }
    }

}
