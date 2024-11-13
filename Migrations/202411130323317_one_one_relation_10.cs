namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one_one_relation_10 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BlogPost", "User_Id", c => c.Int());
            CreateIndex("dbo.BlogPost", "User_Id");
            AddForeignKey("dbo.BlogPost", "User_Id", "dbo.User", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BlogPost", "User_Id", "dbo.User");
            DropIndex("dbo.BlogPost", new[] { "User_Id" });
            DropColumn("dbo.BlogPost", "User_Id");
        }
    }
}
