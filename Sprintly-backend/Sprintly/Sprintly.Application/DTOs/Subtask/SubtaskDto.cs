using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprintly.Application.DTOs.Subtask
{
    public class SubtaskDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public bool IsCompleted { get; set; }
    }
}
