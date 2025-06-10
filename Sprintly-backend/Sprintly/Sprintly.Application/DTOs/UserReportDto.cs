using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprintly.Application.DTOs
{
    public class UserReportDto
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string TenantName { get; set; } = default!;

        public int TotalTasks { get; set; }
        public int TodoTasks { get; set; }
        public int InProgressTasks { get; set; }
        public int DoneTasks { get; set; }

        public Dictionary<string, int> TasksByPriority { get; set; } = new();
    }

}
