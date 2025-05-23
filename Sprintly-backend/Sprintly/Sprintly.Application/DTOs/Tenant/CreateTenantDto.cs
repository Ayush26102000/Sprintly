using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprintly.Application.DTOs.Tenant
{
    public class CreateTenantDto
    {
        public string Name { get; set; } = default!;
        public string Domain { get; set; } = default!;
    }

}
