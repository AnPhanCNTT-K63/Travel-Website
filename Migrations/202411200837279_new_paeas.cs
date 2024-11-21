namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_paeas : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TourPackage", "CheckIn", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.TourPackage", "CheckIn");
        }
    }
}
