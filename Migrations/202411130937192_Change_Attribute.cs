namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Attribute : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BlogPost", "Owner", c => c.String());
            DropColumn("dbo.BlogPost", "Hashtags");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BlogPost", "Hashtags", c => c.String(nullable: false));
            AlterColumn("dbo.BlogPost", "Owner", c => c.String(nullable: false));
        }
    }
}
