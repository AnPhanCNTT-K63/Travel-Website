namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "role", c => c.String(nullable: false));
            DropColumn("dbo.Tours", "role");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tours", "role", c => c.String());
            DropColumn("dbo.Users", "role");
        }
    }
}
