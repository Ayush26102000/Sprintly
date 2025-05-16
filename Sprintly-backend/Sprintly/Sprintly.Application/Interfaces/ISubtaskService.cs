using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprintly.Application.DTOs.Subtask;

namespace Sprintly.Application.Interfaces
{
    public interface ISubtaskService
    {
        Task<SubtaskDto> CreateSubtaskAsync(SubtaskCreateDto dto);
        Task<SubtaskDto?> GetSubtaskAsync(Guid id);
        Task<IEnumerable<SubtaskDto>> GetAllSubtasksForTaskAsync(Guid taskItemId);
        Task<bool> UpdateSubtaskAsync(Guid id, SubtaskUpdateDto dto);
        Task<bool> DeleteSubtaskAsync(Guid id);
    }

}
