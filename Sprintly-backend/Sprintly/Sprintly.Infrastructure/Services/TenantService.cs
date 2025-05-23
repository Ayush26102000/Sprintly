using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProjectPilot.Infrastructure.Persistence;
using Sprintly.Application.DTOs.Tenant;
using Sprintly.Application.Interfaces;


namespace Sprintly.Infrastructure.Services
{
    public class TenantService : ITenantService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TenantService> _logger;

        public TenantService(ApplicationDbContext context, ILogger<TenantService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Guid> CreateTenantAsync(CreateTenantDto dto)
        {
            var tenant = new Tenant
            {
                Name = dto.Name,
                Domain = dto.Domain
            };

            _context.Tenants.Add(tenant);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Tenant created: {@Tenant}", tenant);
            return tenant.Id;
        }

        public async Task<IEnumerable<TenantResponseDto>> GetAllTenantsAsync()
        {
            return await _context.Tenants
                .Select(t => new TenantResponseDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Domain = t.Domain
                })
                .ToListAsync();
        }

        public async Task<TenantResponseDto?> GetTenantByIdAsync(Guid id)
        {
            var tenant = await _context.Tenants.FindAsync(id);
            if (tenant == null) return null;

            return new TenantResponseDto
            {
                Id = tenant.Id,
                Name = tenant.Name,
                Domain = tenant.Domain
            };
        }

        public async Task<bool> UpdateTenantAsync(Guid id, UpdateTenantDto dto)
        {
            var tenant = await _context.Tenants.FindAsync(id);
            if (tenant == null) return false;

            tenant.Name = dto.Name;
            tenant.Domain = dto.Domain;

            _context.Tenants.Update(tenant);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Tenant updated: {@Tenant}", tenant);
            return true;
        }

        public async Task<bool> DeleteTenantAsync(Guid id)
        {
            var tenant = await _context.Tenants.FindAsync(id);
            if (tenant == null) return false;

            _context.Tenants.Remove(tenant);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Tenant deleted: {@Tenant}", tenant);
            return true;
        }
    }
}
