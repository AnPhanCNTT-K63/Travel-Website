namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTime_3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tour", "Ending", c => c.Time(precision: 7));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tour", "Ending");
        }
    }
}
