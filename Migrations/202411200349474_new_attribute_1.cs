namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_attribute_1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "isDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "isDeleted");
        }
    }
}
