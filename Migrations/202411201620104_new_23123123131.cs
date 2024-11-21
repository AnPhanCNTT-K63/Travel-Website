namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_23123123131 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Travler",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Phone = c.String(),
                        Email = c.String(),
                        TourPackage_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TourPackage", t => t.TourPackage_Id)
                .Index(t => t.TourPackage_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Travler", "TourPackage_Id", "dbo.TourPackage");
            DropIndex("dbo.Travler", new[] { "TourPackage_Id" });
            DropTable("dbo.Travler");
        }
    }
}
