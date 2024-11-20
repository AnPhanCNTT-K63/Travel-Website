namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_32341 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "QuickIntroduction", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserProfile", "QuickIntroduction");
        }
    }
}
