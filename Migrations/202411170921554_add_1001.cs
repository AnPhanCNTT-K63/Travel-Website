namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_1001 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tour", "Image", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tour", "Image");
        }
    }
}
