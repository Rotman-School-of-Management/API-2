using FacultyApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Enable CORS policy
builder.Services.AddCors(options =>
{
  options.AddPolicy("ng", policy =>
      policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddXmlSerializerFormatters();   // enables XML output

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("ng");
app.MapControllers();

app.Run();
