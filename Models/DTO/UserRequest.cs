using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class UserRequest
    {
        public int User_Id {  get; set; }
        public string UserName { get; set; }
        public DateTime BookingDate { get; set; }
        public int Booking_Id { get; set; }
        public int TourPackage_Id { get; set; }
        public string TourPackage_Name { get; set; }
        public Decimal TotalPrice { get; set; }
        public string PaymentMethod { get; set; }

    }
}