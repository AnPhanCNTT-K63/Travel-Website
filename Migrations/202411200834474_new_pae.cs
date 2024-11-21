namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_pae : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TourPackage", "IsChangeSchedule", c => c.Boolean(nullable: false));
            AddColumn("dbo.TourPackage", "IsRefund", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TourPackage", "IsRefund");
            DropColumn("dbo.TourPackage", "IsChangeSchedule");
        }
    }
}
