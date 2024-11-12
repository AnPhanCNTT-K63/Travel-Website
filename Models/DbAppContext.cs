using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models
{
    public class DbAppContext : DbContext
    {
        public DbAppContext() : base("name=DbAppContext") { }
        public virtual DbSet<Tour> Tours { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserProfile> UserProfiles { get; set; }
        public virtual DbSet<BlogPost> BlogPosts { get; set; }
            
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Configure one-to-one relationship between User and UserProfile
            modelBuilder.Entity<User>()
                .HasOptional(u => u.UserProfile)  // A User may or may not have a UserProfile
                .WithRequired(up => up.User)     // A UserProfile must have a User
                .Map(m => m.MapKey("UserId"));   // Explicitly map the foreign key to UserId

            base.OnModelCreating(modelBuilder);
        }

    }
}