using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class Ticket
    {
        public string TourPackage_Id { get; set; }
        public string TourPackageName { get; set; }
        public string TourPackageDescription { get; set; }
        public string TravelDate { get; set; }
        public int quantity { get; set; }
        public bool IsChangeSchedule { get; set; }
        public bool IsRefund { get; set; }
    }
}