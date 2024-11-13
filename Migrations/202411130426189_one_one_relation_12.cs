namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one_one_relation_12 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "Content", c => c.String());
            DropColumn("dbo.BlogPost", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BlogPost", "Description", c => c.String());
            DropColumn("dbo.BlogPost", "Content");
        }
    }
}
