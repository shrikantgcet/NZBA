using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Organisation : BaseEntity
    {
        public string OrgName { get; set; }
        public string? ShortCode { get; set; }
        public string? GSTNumber { get; set; }
        public string? AddressStreet1 { get; set; }
        public string? AddressCityTown { get; set; }
        public string? PostCode { get; set; }
        public string? PhonePrefix { get; set; }
        public string? Phone { get; set; }
        public string? AddressStreet2 { get; set; }
        public string? Country { get; set; }
    }
}
