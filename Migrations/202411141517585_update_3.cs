namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "CreatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.BlogPost", "UpdatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.User", "CreatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.User", "UpdatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.Tour", "Activity", c => c.String());
            AddColumn("dbo.Tour", "CreatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.Tour", "UpdatedAt", c => c.DateTime(nullable: false));
            DropColumn("dbo.Tour", "Ratings");
            DropColumn("dbo.Tour", "Stars");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tour", "Stars", c => c.Int(nullable: false));
            AddColumn("dbo.Tour", "Ratings", c => c.Int(nullable: false));
            DropColumn("dbo.Tour", "UpdatedAt");
            DropColumn("dbo.Tour", "CreatedAt");
            DropColumn("dbo.Tour", "Activity");
            DropColumn("dbo.User", "UpdatedAt");
            DropColumn("dbo.User", "CreatedAt");
            DropColumn("dbo.BlogPost", "UpdatedAt");
            DropColumn("dbo.BlogPost", "CreatedAt");
        }
    }
}
