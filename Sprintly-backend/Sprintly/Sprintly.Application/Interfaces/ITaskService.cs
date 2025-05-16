using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprintly.Application.DTOs.Tasks;

namespace Sprintly.Application.Interfaces
{
    public interface ITaskService
    {
        Task<Guid> CreateTaskAsync(CreateTaskDto dto, Guid userId);
        Task<IEnumerable<TaskResponseDto>> GetTasksAsync(Guid userId, int page, int pageSize);
        Task<TaskResponseDto?> GetTaskByIdAsync(Guid id, Guid userId);
        Task<bool> UpdateTaskAsync(Guid id, UpdateTaskDto dto, Guid userId);
        Task<bool> DeleteTaskAsync(Guid id, Guid userId);
        Task<IEnumerable<TaskResponseDto>> FilterAndSortTasksAsync(Guid userId, TaskStatus? status = null, Priority? priority = null, string? sortBy = null, bool descending = false);

    }

}
