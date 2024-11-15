namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_4 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Destination",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Region = c.String(),
                        Country = c.String(),
                        City = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Tour", "Destination_Id", c => c.Int());
            CreateIndex("dbo.Tour", "Destination_Id");
            AddForeignKey("dbo.Tour", "Destination_Id", "dbo.Destination", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tour", "Destination_Id", "dbo.Destination");
            DropIndex("dbo.Tour", new[] { "Destination_Id" });
            DropColumn("dbo.Tour", "Destination_Id");
            DropTable("dbo.Destination");
        }
    }
}
