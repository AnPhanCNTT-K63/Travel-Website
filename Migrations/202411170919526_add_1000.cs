namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_1000 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tour", "CreatedAt", c => c.DateTime());
            AddColumn("dbo.Tour", "UpdateAt", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tour", "UpdateAt");
            DropColumn("dbo.Tour", "CreatedAt");
        }
    }
}
