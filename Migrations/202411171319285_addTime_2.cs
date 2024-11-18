namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTime_2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tour", "Opening", c => c.Time(precision: 7));
            DropColumn("dbo.TourPackage", "Opening");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TourPackage", "Opening", c => c.Time(precision: 7));
            DropColumn("dbo.Tour", "Opening");
        }
    }
}
