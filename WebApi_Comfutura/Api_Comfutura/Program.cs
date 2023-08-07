 
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Implementations.Accesos;
using Api_Comfutura.Services.Implementations.Logistica.Procesos;
using Api_Comfutura.Services.Implementations.Requerimientos.Procesos;
using Api_Comfutura.Services.Implementations.Uploads;
using Api_Comfutura.Services.Interfaces.Accesos;
using Api_Comfutura.Services.Interfaces.Logistica.Procesos;
using Api_Comfutura.Services.Interfaces.Requerimientos.Procesos;
using Api_Comfutura.Services.Interfaces.Uploads;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Configuration;
using System.Globalization;
using System.Text;
 

var builder = WebApplication.CreateBuilder(args);

string cors = "configurarCors";

// Add services to the container.
//- AddNewtonsoftJson();para poder utilizar datatables, importantisimo ...

builder.Services.AddControllers()
                .AddNewtonsoftJson(options =>
               {
                   // Use the default property (Pascal) casing
                   //options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                   options.SerializerSettings.ContractResolver = null;
                   options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
               });


// configura el contexto como un servicio cuando se instancia una clase o en un constrolador e..
IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
        .AddJsonFile("appsettings.json").Build();

builder.Services.AddDbContext<MFsoft_COMFUTURAContext>(options => options.UseSqlServer(configuration.GetConnectionString("cn")));


//---agregando cors ----
builder.Services.AddCors(option =>
{
    option.AddPolicy(name: cors, builder =>
    {
        builder.WithMethods("*");
        builder.WithHeaders("*");
        builder.WithOrigins("*");
    });
});


//agregando servicios----
builder.Services.AddScoped<ILogin, LoginServices>();
builder.Services.AddScoped<IUploads, UploadsServices>();

//--almacenado archivos---
builder.Services.AddScoped<IAlmacenarArchivos, AlmacenarArchivosServices>();
builder.Services.AddScoped<IRegistroOT, RegistroOTServices>();
builder.Services.AddScoped<IRegistroRequerimiento, RegistroRequerimientoServices>();
builder.Services.AddScoped<IcotizacionOC, CotizacionOCServices>();
builder.Services.AddScoped<IRegistroFacturas, RegistroFacturasServices>();
builder.Services.AddScoped<IRegistroSolicitudes, RegistroSolicitudesServices>();

builder.Services.AddHttpContextAccessor();

//JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:ClaveSecreta"]))
    };
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

 
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

//---trabajando con archivos
app.UseStaticFiles();

//--- habilitando usando   jwt ----
app.UseAuthentication();

app.UseAuthorization();


//--- configurando los lenguajes
var options = new RequestLocalizationOptions()
    .SetDefaultCulture("es-PE")
    .AddSupportedCultures("es-PE")
    .AddSupportedUICultures("es-PE");

app.UseRequestLocalization(options);



//---habilitando   cors ----
app.UseCors(cors);


app.MapControllers();

app.Run();
