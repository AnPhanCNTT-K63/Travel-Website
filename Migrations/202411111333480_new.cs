namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _new : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserProfiles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        Address = c.String(),
                        City = c.String(),
                        Country = c.String(),
                        PostalCode = c.Int(nullable: false),
                        AboutMe = c.String(),
                        FriendNum = c.String(),
                        PhotoNum = c.String(),
                        CommentNum = c.String(),
                        Avatar = c.String(),
                        CoverAvatar = c.String(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId);
            
            AddColumn("dbo.Tours", "Region", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserProfiles", "UserId", "dbo.Users");
            DropIndex("dbo.UserProfiles", new[] { "UserId" });
            DropColumn("dbo.Tours", "Region");
            DropTable("dbo.UserProfiles");
        }
    }
}
