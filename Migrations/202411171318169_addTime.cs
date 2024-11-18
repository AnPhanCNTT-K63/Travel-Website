namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTime : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TourPackage", "Opening", c => c.Time(precision: 7));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TourPackage", "Opening");
        }
    }
}
