using System.ComponentModel.DataAnnotations;

namespace NZBAAPIs.Model
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string? ClientUrl { get; set; }
    }
}
