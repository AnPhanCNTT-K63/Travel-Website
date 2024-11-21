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
              name: "PostByUserId",
              url: "Post/findByUserId/post/{user_id}",
              defaults: new { controller = "Post", action = "getPostsByUserId" }
          );

            routes.MapRoute(
              name: "UpdatePost",
              url: "Post/update/post/{id}",
              defaults: new { controller = "Post", action = "updatePost" }
          );

            routes.MapRoute(
              name: "DeletePost",
              url: "Post/delete/post/{id}",
              defaults: new { controller = "Post", action = "DeletePost" }
          );

            routes.MapRoute(
             name: "CreateTourAndPackages",
             url: "Tour/create/tourAndPackages",
             defaults: new { controller = "Tour", action = "tourAndPackagesCreate" }
         );

            routes.MapRoute(
             name: "TourDetail",
             url: "Tour/detail/tour/{id}",
             defaults: new { controller = "Tour", action = "tourDetail" }
         );

            routes.MapRoute(
             name: "CreateTourPackage",
             url: "TourPackage/create/tourPackage",
             defaults: new { controller = "TourPackage", action = "tourPackages" }
         );

            routes.MapRoute(
             name: "UserProfileDetail",
             url: "User/profile/{user_id}",
             defaults: new { controller = "User", action = "getProfileByUserId" }
         );

            routes.MapRoute(
            name: "UserAccount",
            url: "User/account/{user_id}",
            defaults: new { controller = "User", action = "getAccountInfo" }
        );

            routes.MapRoute(
            name: "UpdateAccount",
            url: "User/update/account",
            defaults: new { controller = "User", action = "updateAccount" }
        );

            routes.MapRoute(
            name: "SoftDeleteAccount",
            url: "User/softDeleted/account/{user_id}",
            defaults: new { controller = "User", action = "SoftDeleteAccount" }
        );

            routes.MapRoute(
            name: "RestoreAccount",
            url: "User/restore/account",
            defaults: new { controller = "User", action = "RestoreAccount" }
        );
            routes.MapRoute(
            name: "GetBooking",
            url: "Booking/info/{tourPackageId}",
            defaults: new { controller = "Booking", action = "getBookingInfo" }
        );
            routes.MapRoute(
            name: "GetContactInfo",
            url: "User/contact/info/{user_id}",
            defaults: new { controller = "User", action = "ContactInfo" }
        );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Hangfire", action = "ShowProcess", id = UrlParameter.Optional }
            );
        }
    }
}
