using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebBackendProject
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "CreatePost",
               url: "Post/create/post",
               defaults: new { controller = "Post", action = "createPost" }
           );

            routes.MapRoute(
              name: "PostDetail",
              url: "Post/detail/post/{id}",
              defaults: new { controller = "Post", action = "postDetail" }
          );

            routes.MapRoute(
              name: "PostUpdate",
              url: "Post/update/post/{id}",
              defaults: new { controller = "Post", action = "updatePost" }
          );

            routes.MapRoute(
              name: "PostDelete",
              url: "Post/delete/post/{id}",
              defaults: new { controller = "Post", action = "DeletePost" }
          );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Tour", action = "tours", id = UrlParameter.Optional }
            );
        }
    }
}
