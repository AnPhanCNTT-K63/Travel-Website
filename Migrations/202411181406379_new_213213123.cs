namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_213213123 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "LastActive", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "LastActive");
        }
    }
}
