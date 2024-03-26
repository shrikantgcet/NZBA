using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NZBAAPIs.Migrations
{
    public partial class ForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Item_OrganisationId",
                table: "Item",
                column: "OrganisationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Item_Organisation_OrganisationId",
                table: "Item",
                column: "OrganisationId",
                principalTable: "Organisation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_Organisation_OrganisationId",
                table: "Item");

            migrationBuilder.DropIndex(
                name: "IX_Item_OrganisationId",
                table: "Item");
        }
    }
}
