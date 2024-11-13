namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one_one_relation_9 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.BlogPosts", newName: "BlogPost");
            RenameTable(name: "dbo.Tours", newName: "Tour");
            RenameTable(name: "dbo.UserProfiles", newName: "UserProfile");
            RenameTable(name: "dbo.Users", newName: "User");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.User", newName: "Users");
            RenameTable(name: "dbo.UserProfile", newName: "UserProfiles");
            RenameTable(name: "dbo.Tour", newName: "Tours");
            RenameTable(name: "dbo.BlogPost", newName: "BlogPosts");
        }
    }
}
