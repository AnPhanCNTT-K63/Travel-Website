using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class BlogPost
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public DateTime? Datetime { get; set; }

        [Required]
        public string Image { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string Hashtags { get; set; }
        public string Owner { get; set; }
        public User User { get; set; }
    }
}