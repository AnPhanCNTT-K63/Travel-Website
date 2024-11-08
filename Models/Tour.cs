using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class Tour
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id {  get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public Decimal price { get; set; }
        //date
    }
}   