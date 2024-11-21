namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_paeasad : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Schedule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Quantity = c.Int(nullable: false),
                        TourPackage_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TourPackage", t => t.TourPackage_Id)
                .Index(t => t.TourPackage_Id);
            
            DropColumn("dbo.TourPackage", "Quantity");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TourPackage", "Quantity", c => c.Int(nullable: false));
            DropForeignKey("dbo.Schedule", "TourPackage_Id", "dbo.TourPackage");
            DropIndex("dbo.Schedule", new[] { "TourPackage_Id" });
            DropTable("dbo.Schedule");
        }
    }
}
