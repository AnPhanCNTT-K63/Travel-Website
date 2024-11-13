namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one_one_relation_11 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BlogPost", "Datetime", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BlogPost", "Datetime", c => c.DateTime(nullable: false));
        }
    }
}
