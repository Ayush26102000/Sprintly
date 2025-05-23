namespace Sprintly.Application.DTOs.Projects
{
    public class CreateProjectDto
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = string.Empty;
        public Guid TenantId { get; set; }
    }

    public class UpdateProjectDto
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = string.Empty;
        public Guid TenantId { get; set; }
    }

    public class ProjectResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = string.Empty;
        public Guid TenantId { get; set; }
        public string TenantName { get; set; } = default!;
    }
}
