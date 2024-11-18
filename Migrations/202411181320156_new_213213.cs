namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_213213 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tour", "User_Id", c => c.Int());
            CreateIndex("dbo.Tour", "User_Id");
            AddForeignKey("dbo.Tour", "User_Id", "dbo.User", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tour", "User_Id", "dbo.User");
            DropIndex("dbo.Tour", new[] { "User_Id" });
            DropColumn("dbo.Tour", "User_Id");
        }
    }
}
