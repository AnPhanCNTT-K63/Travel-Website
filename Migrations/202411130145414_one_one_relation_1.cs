namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one_one_relation_1 : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.UserProfiles");
            AddPrimaryKey("dbo.UserProfiles", "UserId");
            DropColumn("dbo.UserProfiles", "Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserProfiles", "Id", c => c.Int(nullable: false, identity: true));
            DropPrimaryKey("dbo.UserProfiles");
            AddPrimaryKey("dbo.UserProfiles", "Id");
        }
    }
}
