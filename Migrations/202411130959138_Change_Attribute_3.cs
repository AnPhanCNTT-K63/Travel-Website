namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Attribute_3 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.BlogPost", "Hashtags");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BlogPost", "Hashtags", c => c.String(nullable: false));
        }
    }
}
