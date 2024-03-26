using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
namespace Service.Interfaces
{
    public interface IOrganisationService
    {
        IEnumerable<Organisation> GetOrganisations();
        Organisation GetOrganisation(long id);
        void InsertOrganisation(Organisation organisation);
        void UpdateOrganisation(Organisation organisation);
        void DeleteOrganisation(long id);
    }
}
