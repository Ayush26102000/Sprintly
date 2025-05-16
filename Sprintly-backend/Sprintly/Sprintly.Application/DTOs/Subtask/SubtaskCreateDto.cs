using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprintly.Application.DTOs.Subtask
{
    public class SubtaskCreateDto
    {
        public string Title { get; set; } = default!;
        public Guid TaskItemId { get; set; }
    }
}
