using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprintly.Application.DTOs
{
    public class TaskDto
    {
        public Guid TaskId { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public TaskStatus Status { get; set; }
        public Priority Priority { get; set; }
        public string ProjectName { get; set; } = default!;
    }

}
