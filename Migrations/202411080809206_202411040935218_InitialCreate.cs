namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _202411040935218_InitialCreate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tours", "role", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tours", "role");
        }
    }
}
