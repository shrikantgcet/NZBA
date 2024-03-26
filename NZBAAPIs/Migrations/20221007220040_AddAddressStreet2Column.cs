using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NZBAAPIs.Migrations
{
    public partial class AddAddressStreet2Column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AddressStreet2",
                table: "Organisation",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressStreet2",
                table: "Organisation");
        }
    }
}
