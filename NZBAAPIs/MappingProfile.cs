using AutoMapper;
using NZBAAPIs.DataTransferObjects;
using NZBAAPIs.Model;
using Repository.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace NZBAAPIs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
              CreateMap<UserDto, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }
}
