namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class change_null : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BlogPost", "CreatedAt", c => c.DateTime());
            AlterColumn("dbo.BlogPost", "UpdatedAt", c => c.DateTime());
            AlterColumn("dbo.User", "CreatedAt", c => c.DateTime());
            AlterColumn("dbo.User", "UpdatedAt", c => c.DateTime());
            AlterColumn("dbo.TourReview", "CreatedAt", c => c.DateTime());
            AlterColumn("dbo.TourReview", "UpdatedAt", c => c.DateTime());
            AlterColumn("dbo.Tour", "CreatedAt", c => c.DateTime());
            AlterColumn("dbo.Tour", "UpdatedAt", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tour", "UpdatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Tour", "CreatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.TourReview", "UpdatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.TourReview", "CreatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.User", "UpdatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.User", "CreatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.BlogPost", "UpdatedAt", c => c.DateTime(nullable: false));
            AlterColumn("dbo.BlogPost", "CreatedAt", c => c.DateTime(nullable: false));
        }
    }
}
