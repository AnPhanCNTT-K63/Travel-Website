namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_323 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "Birthday", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserProfile", "Birthday");
        }
    }
}
