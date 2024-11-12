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
        public int Id {  get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public Decimal Price { get; set; }
        public int Ratings { get; set; }
        public int Stars { get; set; }
        public int Quantity { get; set; }

        public string Region { get; set; }
    }
}   