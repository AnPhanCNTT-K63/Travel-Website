namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one_one_relation_13 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "Owner", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Title", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Image", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Content", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Hashtags", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BlogPost", "Hashtags", c => c.String());
            AlterColumn("dbo.BlogPost", "Content", c => c.String());
            AlterColumn("dbo.BlogPost", "Image", c => c.String());
            AlterColumn("dbo.BlogPost", "Title", c => c.String());
            DropColumn("dbo.BlogPost", "Owner");
        }
    }
}
