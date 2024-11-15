namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_5 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TourReview",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Star = c.Int(nullable: false),
                        Review = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        Tour_Id = c.Int(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Tour", t => t.Tour_Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.Tour_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TourReview", "User_Id", "dbo.User");
            DropForeignKey("dbo.TourReview", "Tour_Id", "dbo.Tour");
            DropIndex("dbo.TourReview", new[] { "User_Id" });
            DropIndex("dbo.TourReview", new[] { "Tour_Id" });
            DropTable("dbo.TourReview");
        }
    }
}
