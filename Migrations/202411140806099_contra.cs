namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class contra : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.User", "Email", c => c.String(nullable: false, maxLength: 255));
            CreateIndex("dbo.User", "Email", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.User", new[] { "Email" });
            AlterColumn("dbo.User", "Email", c => c.String(nullable: false));
        }
    }
}
