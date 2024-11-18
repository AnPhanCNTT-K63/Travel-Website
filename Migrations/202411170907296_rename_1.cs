namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rename_1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BookingDetail", "Tour_Id", "dbo.Tour");
            DropForeignKey("dbo.Tour", "Destination_Id", "dbo.Destination");
            DropForeignKey("dbo.TourReview", "Tour_Id", "dbo.Tour");
            DropIndex("dbo.BookingDetail", new[] { "Tour_Id" });
            DropIndex("dbo.Tour", new[] { "Destination_Id" });
            DropIndex("dbo.TourReview", new[] { "Tour_Id" });
            CreateTable(
                "dbo.TourPackage",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Image = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Quantity = c.Int(nullable: false),
                        Activity = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                        Tour_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Tour", t => t.Tour_Id)
                .Index(t => t.Tour_Id);
            
            AddColumn("dbo.BookingDetail", "TourPackage_Id", c => c.Int());
            AddColumn("dbo.Tour", "Region", c => c.String());
            AddColumn("dbo.Tour", "Country", c => c.String());
            AddColumn("dbo.Tour", "City", c => c.String());
            AddColumn("dbo.TourReview", "TourPackage_Id", c => c.Int());
            CreateIndex("dbo.BookingDetail", "TourPackage_Id");
            CreateIndex("dbo.TourReview", "TourPackage_Id");
            AddForeignKey("dbo.BookingDetail", "TourPackage_Id", "dbo.TourPackage", "Id");
            AddForeignKey("dbo.TourReview", "TourPackage_Id", "dbo.TourPackage", "Id");
            DropColumn("dbo.BookingDetail", "Tour_Id");
            DropColumn("dbo.Tour", "Description");
            DropColumn("dbo.Tour", "Image");
            DropColumn("dbo.Tour", "Price");
            DropColumn("dbo.Tour", "Quantity");
            DropColumn("dbo.Tour", "Activity");
            DropColumn("dbo.Tour", "CreatedAt");
            DropColumn("dbo.Tour", "UpdatedAt");
            DropColumn("dbo.Tour", "Destination_Id");
            DropColumn("dbo.TourReview", "Tour_Id");
            DropTable("dbo.Destination");
        }
        
        public override void Down()
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
            
            AddColumn("dbo.TourReview", "Tour_Id", c => c.Int());
            AddColumn("dbo.Tour", "Destination_Id", c => c.Int());
            AddColumn("dbo.Tour", "UpdatedAt", c => c.DateTime());
            AddColumn("dbo.Tour", "CreatedAt", c => c.DateTime());
            AddColumn("dbo.Tour", "Activity", c => c.String());
            AddColumn("dbo.Tour", "Quantity", c => c.Int(nullable: false));
            AddColumn("dbo.Tour", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Tour", "Image", c => c.String());
            AddColumn("dbo.Tour", "Description", c => c.String());
            AddColumn("dbo.BookingDetail", "Tour_Id", c => c.Int());
            DropForeignKey("dbo.TourReview", "TourPackage_Id", "dbo.TourPackage");
            DropForeignKey("dbo.TourPackage", "Tour_Id", "dbo.Tour");
            DropForeignKey("dbo.BookingDetail", "TourPackage_Id", "dbo.TourPackage");
            DropIndex("dbo.TourReview", new[] { "TourPackage_Id" });
            DropIndex("dbo.TourPackage", new[] { "Tour_Id" });
            DropIndex("dbo.BookingDetail", new[] { "TourPackage_Id" });
            DropColumn("dbo.TourReview", "TourPackage_Id");
            DropColumn("dbo.Tour", "City");
            DropColumn("dbo.Tour", "Country");
            DropColumn("dbo.Tour", "Region");
            DropColumn("dbo.BookingDetail", "TourPackage_Id");
            DropTable("dbo.TourPackage");
            CreateIndex("dbo.TourReview", "Tour_Id");
            CreateIndex("dbo.Tour", "Destination_Id");
            CreateIndex("dbo.BookingDetail", "Tour_Id");
            AddForeignKey("dbo.TourReview", "Tour_Id", "dbo.Tour", "Id");
            AddForeignKey("dbo.Tour", "Destination_Id", "dbo.Destination", "Id");
            AddForeignKey("dbo.BookingDetail", "Tour_Id", "dbo.Tour", "Id");
        }
    }
}
