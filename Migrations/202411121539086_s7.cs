namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class s7 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BlogPosts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Datetime = c.DateTime(nullable: false),
                        Image = c.String(),
                        Description = c.String(),
                        Hashtags = c.String(),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(nullable: false, maxLength: 50),
                        Email = c.String(nullable: false),
                        Password = c.String(nullable: false, maxLength: 100),
                        Role = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserProfiles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        Address = c.String(),
                        City = c.String(),
                        Country = c.String(),
                        PostalCode = c.Int(nullable: false),
                        AboutMe = c.String(),
                        FriendNum = c.String(),
                        PostNum = c.String(),
                        CommentNum = c.String(),
                        Avatar = c.String(),
                        CoverAvatar = c.String(),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Tours",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Image = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Ratings = c.Int(nullable: false),
                        Stars = c.Int(nullable: false),
                        Quantity = c.Int(nullable: false),
                        Region = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BlogPosts", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserProfiles", "UserId", "dbo.Users");
            DropIndex("dbo.UserProfiles", new[] { "UserId" });
            DropIndex("dbo.BlogPosts", new[] { "UserId" });
            DropTable("dbo.Tours");
            DropTable("dbo.UserProfiles");
            DropTable("dbo.Users");
            DropTable("dbo.BlogPosts");
        }
    }
}
