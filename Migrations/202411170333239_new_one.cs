namespace WebBackendProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_one : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Booking",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BookingDate = c.DateTime(nullable: false),
                        Status = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.BookingDetail",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BookingQuantity = c.Int(nullable: false),
                        Discount = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                        Booking_Id = c.Int(),
                        Tour_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Booking", t => t.Booking_Id)
                .ForeignKey("dbo.Tour", t => t.Tour_Id)
                .Index(t => t.Booking_Id)
                .Index(t => t.Tour_Id);
            
            CreateTable(
                "dbo.Payment",
                c => new
                    {
                        Booking_Id = c.Int(nullable: false),
                        PaymentDate = c.DateTime(nullable: false),
                        PaymentMethod = c.String(),
                        PaymentAmount = c.String(),
                        PaymentStatus = c.String(),
                        TransactionId = c.String(),
                        CreatedAt = c.DateTime(),
                        UpdatedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.Booking_Id)
                .ForeignKey("dbo.Booking", t => t.Booking_Id)
                .Index(t => t.Booking_Id);
            
            DropColumn("dbo.Tour", "Region");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tour", "Region", c => c.String());
            DropForeignKey("dbo.Booking", "User_Id", "dbo.User");
            DropForeignKey("dbo.Payment", "Booking_Id", "dbo.Booking");
            DropForeignKey("dbo.BookingDetail", "Tour_Id", "dbo.Tour");
            DropForeignKey("dbo.BookingDetail", "Booking_Id", "dbo.Booking");
            DropIndex("dbo.Payment", new[] { "Booking_Id" });
            DropIndex("dbo.BookingDetail", new[] { "Tour_Id" });
            DropIndex("dbo.BookingDetail", new[] { "Booking_Id" });
            DropIndex("dbo.Booking", new[] { "User_Id" });
            DropTable("dbo.Payment");
            DropTable("dbo.BookingDetail");
            DropTable("dbo.Booking");
        }
    }
}
