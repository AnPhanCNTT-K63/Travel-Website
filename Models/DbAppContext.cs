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
    }
}