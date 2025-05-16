using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjectPilot.Infrastructure.Persistence;
using Sprintly.Application.DTOs.Subtask;
using Sprintly.Application.Interfaces;

namespace Sprintly.Infrastructure.Services
{
    public class SubtaskService : ISubtaskService
    {
        private readonly ApplicationDbContext _context;

        public SubtaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SubtaskDto> CreateSubtaskAsync(SubtaskCreateDto dto)
        {
            var subtask = new Subtask
            {
                Title = dto.Title,
                TaskItemId = dto.TaskItemId,
                IsCompleted = false
            };

            _context.Subtasks.Add(subtask);
            await _context.SaveChangesAsync();

            return new SubtaskDto
            {
                Id = subtask.Id,
                Title = subtask.Title,
                IsCompleted = subtask.IsCompleted
            };
        }

        public async Task<SubtaskDto?> GetSubtaskAsync(Guid id)
        {
            var subtask = await _context.Subtasks.FindAsync(id);
            return subtask == null ? null : new SubtaskDto
            {
                Id = subtask.Id,
                Title = subtask.Title,
                IsCompleted = subtask.IsCompleted
            };
        }

        public async Task<IEnumerable<SubtaskDto>> GetAllSubtasksForTaskAsync(Guid taskItemId)
        {
            var subtasks = await _context.Subtasks
                .Where(s => s.TaskItemId == taskItemId)
                .ToListAsync();

            return subtasks.Select(s => new SubtaskDto
            {
                Id = s.Id,
                Title = s.Title,
                IsCompleted = s.IsCompleted
            });
        }

        public async Task<bool> UpdateSubtaskAsync(Guid id, SubtaskUpdateDto dto)
        {
            var subtask = await _context.Subtasks.FindAsync(id);
            if (subtask == null) return false;

            subtask.Title = dto.Title;
            subtask.IsCompleted = dto.IsCompleted;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSubtaskAsync(Guid id)
        {
            var subtask = await _context.Subtasks.FindAsync(id);
            if (subtask == null) return false;

            _context.Subtasks.Remove(subtask);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
