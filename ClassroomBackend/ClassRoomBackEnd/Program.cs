using Microsoft.AspNetCore.Identity;
using ClassRoomBackEnd.Data;
using ClassRoomBackEnd.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ClassroomDb"));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapGet("/", () => Results.Redirect("/swagger"));


// Seed initial users
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    await SeedRolesAndUsers(roleManager, userManager);
}

app.Run();

async Task SeedRolesAndUsers(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
{
    // Seed roles
    string[] roles = { "Admin", "Teacher", "Learner" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    // Seed admin user
    var admin = new ApplicationUser
    {
        UserName = "admin@test.com",
        Email = "admin@test.com",
        Role = "Admin"
    };
    await CreateUser(userManager, admin, "Admin@123", "Admin");

    // Seed teacher user
    var teacher = new ApplicationUser
    {
        UserName = "teacher@test.com",
        Email = "teacher@test.com",
        Role = "Teacher"
    };
    await CreateUser(userManager, teacher, "Teacher@123", "Teacher");

    // Seed learner user
    var learner = new ApplicationUser
    {
        UserName = "learner@test.com",
        Email = "learner@test.com",
        Role = "Learner"
    };
    await CreateUser(userManager, learner, "Learner@123", "Learner");
}

async Task CreateUser(UserManager<ApplicationUser> userManager, ApplicationUser user, string password, string role)
{
    if (await userManager.FindByEmailAsync(user.Email) == null)
    {
        await userManager.CreateAsync(user, password);
        await userManager.AddToRoleAsync(user, role);
    }
}