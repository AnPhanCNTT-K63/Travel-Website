using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class UserProfile
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int PostalCode { get; set; }
        public string AboutMe { get; set; }
        public string FriendNum { get; set; }
        public string PostNum { get; set; }
        public string CommentNum { get; set; }
        public string Avatar { get; set; }
        public string CoverAvatar { get; set; }


        // Navigation property for one-to-one relationship
        public virtual User User { get; set; }

    }
}