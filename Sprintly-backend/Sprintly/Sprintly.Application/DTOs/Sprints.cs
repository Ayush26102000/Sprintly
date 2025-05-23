namespace Sprintly.Application.DTOs.Sprints
{
    public class CreateSprintDto
    {
        public string Name { get; set; } = default!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid ProjectId { get; set; }
    }

    public class UpdateSprintDto
    {
        public string Name { get; set; } = default!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid ProjectId { get; set; }
    }

    public class SprintResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; } = default!;
    }
}
