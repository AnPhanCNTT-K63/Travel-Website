namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class one_one_relation_7 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BlogPosts", "UserId", "dbo.Users");
            DropIndex("dbo.BlogPosts", new[] { "UserId" });
            DropColumn("dbo.BlogPosts", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BlogPosts", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.BlogPosts", "UserId");
            AddForeignKey("dbo.BlogPosts", "UserId", "dbo.Users", "Id", cascadeDelete: true);
        }
    }
}
