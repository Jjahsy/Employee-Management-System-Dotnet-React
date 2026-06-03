using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// DbContext aur Connection String register karein
builder.Services.AddDbContext<EmployeeManagementAPI.Data.ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    // Repository aur Service ko DI Container mein register karein
builder.Services.AddScoped<EmployeeManagementAPI.Repositories.IEmployeeRepository, EmployeeManagementAPI.Repositories.EmployeeRepository>();
builder.Services.AddScoped<EmployeeManagementAPI.Services.IEmployeeService, EmployeeService>();

// CORS Setup (React Frontend se connectivity ke liye)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
 // Vite React ka default port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowReact");


app.UseAuthorization();

app.MapControllers();

app.Run();
