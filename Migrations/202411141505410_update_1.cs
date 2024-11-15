namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_1 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.User", new[] { "Email" });
            AlterColumn("dbo.BlogPost", "Title", c => c.String());
            AlterColumn("dbo.BlogPost", "Image", c => c.String());
            AlterColumn("dbo.BlogPost", "Content", c => c.String());
            AlterColumn("dbo.BlogPost", "Hashtags", c => c.String());
            AlterColumn("dbo.User", "Username", c => c.String(maxLength: 50));
            AlterColumn("dbo.User", "Email", c => c.String(maxLength: 255));
            AlterColumn("dbo.User", "Password", c => c.String(maxLength: 100));
            AlterColumn("dbo.UserProfile", "FirstName", c => c.String());
            AlterColumn("dbo.UserProfile", "LastName", c => c.String());
            CreateIndex("dbo.User", "Email", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.User", new[] { "Email" });
            AlterColumn("dbo.UserProfile", "LastName", c => c.String(nullable: false));
            AlterColumn("dbo.UserProfile", "FirstName", c => c.String(nullable: false));
            AlterColumn("dbo.User", "Password", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.User", "Email", c => c.String(nullable: false, maxLength: 255));
            AlterColumn("dbo.User", "Username", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.BlogPost", "Hashtags", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Content", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Image", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Title", c => c.String(nullable: false));
            CreateIndex("dbo.User", "Email", unique: true);
        }
    }
}
