

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NZBAAPIs.Model
{
    public class Customer
    {
        public int CustomerId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        
        [MaxLength(100)]
        public string Line1 { get; set; } = default!;
        [MaxLength(50)]
        public string Town { get; set; } = string.Empty;
        [MaxLength(50)]
        public string City { get; set; } = default!;
        [MaxLength(10)]
        public string PostCode { get; set; } = default;
    }
}
