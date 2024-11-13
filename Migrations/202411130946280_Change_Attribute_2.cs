namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Attribute_2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "Hashtags", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BlogPost", "Hashtags");
        }
    }
}
