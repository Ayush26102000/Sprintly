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
        public int TodoTasks { get; set; }
        public int InProgressTasks { get; set; }
        public int DoneTasks { get; set; }
        public List<string> ProjectNames { get; set; } = new();
        public List<TaskDto> Tasks { get; set; } = new(); // New line
    }




}
