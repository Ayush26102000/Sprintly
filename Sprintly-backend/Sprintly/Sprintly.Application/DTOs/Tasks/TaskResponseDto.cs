using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprintly.Application.DTOs.Tasks
{
    public class TaskResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public string Description { get; set; } = string.Empty;
        public TaskStatus Status { get; set; }
        public Priority Priority { get; set; }

        public Guid ProjectId { get; set; }
        public Guid? SprintId { get; set; }
    }

}
