using Domain.Models;
using Repository.IRepository;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class OrganisationService : IOrganisationService
    {
        private IRepository<Organisation> organisationRepository;
        
        public OrganisationService(IRepository<Organisation> organisationRepository)
        {
            this.organisationRepository = organisationRepository;

        }
        public void DeleteOrganisation(long id)
        {
            Organisation organisation = GetOrganisation(id);
            organisationRepository.Remove(organisation);
            organisationRepository.SaveChanges();
        }

        public Organisation GetOrganisation(long id)
        {
            return organisationRepository.Get(id);
        }

        public IEnumerable<Organisation> GetOrganisations()
        {
            return organisationRepository.GetAll();
        }

        public void InsertOrganisation(Organisation organisation)
        {
            organisationRepository.Insert(organisation);
        }

        public void UpdateOrganisation(Organisation organisation)
        {
            organisationRepository.Update(organisation);
        }
    }
}
