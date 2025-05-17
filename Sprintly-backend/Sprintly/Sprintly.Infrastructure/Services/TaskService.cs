using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProjectPilot.Infrastructure.Persistence;
using Sprintly.Application.DTOs.Tasks;
using Sprintly.Application.Interfaces;

namespace Sprintly.Infrastructure.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TaskService> _logger;

        public TaskService(ApplicationDbContext context,ILogger<TaskService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Guid> CreateTaskAsync(CreateTaskDto dto, Guid userId)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                Status = TaskStatus.InProgress, // default status
                AssignedToUserId = userId,
                ProjectId = dto.ProjectId,
                SprintId = dto.SprintId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Task created: {@Task}", task);
            return task.Id;
        }

        public async Task<IEnumerable<TaskResponseDto>> GetTasksAsync(Guid userId, int page, int pageSize)
        {
            return await _context.Tasks
                .Where(t => t.AssignedToUserId == userId)
                .OrderByDescending(t => t.Priority)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    ProjectId = t.ProjectId,
                    SprintId = t.SprintId
                })
                .ToListAsync();
        }

        public async Task<TaskResponseDto?> GetTaskByIdAsync(Guid taskId, Guid userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId && t.AssignedToUserId == userId);

            if (task == null) return null;

            return new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Status = task.Status,
                Priority = task.Priority,
                ProjectId = task.ProjectId,
                SprintId = task.SprintId
            };
        }

        public async Task<bool> UpdateTaskAsync(Guid taskId, UpdateTaskDto dto, Guid userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId && t.AssignedToUserId == userId);

            if (task == null) return false;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Status = dto.Status;
            task.Priority = dto.Priority;
            task.ProjectId = dto.ProjectId;
            task.SprintId = dto.SprintId;

            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTaskAsync(Guid taskId, Guid userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId && t.AssignedToUserId == userId);

            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<IEnumerable<TaskResponseDto>> FilterAndSortTasksAsync(
     Guid userId,
     TaskStatus? status = null,
     Priority? priority = null,
     string? sortBy = null,
     bool descending = false)
        {
            var query = _context.Tasks
                .Where(t => t.AssignedToUserId == userId)
                .AsQueryable();

            if (status.HasValue)
                query = query.Where(t => t.Status == status.Value);

            if (priority.HasValue)
                query = query.Where(t => t.Priority == priority.Value);

            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                query = sortBy.ToLower() switch
                {
                    "priority" => descending ? query.OrderByDescending(t => t.Priority) : query.OrderBy(t => t.Priority),
                    "status" => descending ? query.OrderByDescending(t => t.Status) : query.OrderBy(t => t.Status),
                    _ => query
                };
            }

            return await query
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    ProjectId = t.ProjectId,
                    SprintId = t.SprintId
                })
                .ToListAsync();
        }


    }

}
