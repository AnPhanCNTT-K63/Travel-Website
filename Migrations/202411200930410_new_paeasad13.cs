namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_paeasad13 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Schedule", "TravelDay", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Schedule", "TravelDay");
        }
    }
}
