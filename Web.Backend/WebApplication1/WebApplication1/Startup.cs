using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using EGD.Repositories;
using EGD.Repositories.Interfaces;
using EGD.Repositories.Repos;

namespace WebApplication1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("Policy", builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                );
            });

            services.AddScoped<IEGDRepository, EGDRepository>();
            services.AddScoped<IContainersRepository,ContainersRepository>();
            services.AddScoped<IStatesRepository, StatesRepository>();
            services.AddScoped<IState_ValuesRepository, State_ValuesRepository>();
            services.AddScoped<ICollectorsRepository, CollectorsRepository>();
            services.AddScoped<ITripsRepository, TripsRepository>();
            services.AddScoped<ICollectors_ContainersRepository, Collectors_ContainersRepository>();
            services.AddScoped<ICollectors_TripsRepository, Collectors_TripsRepository>();
            services.AddScoped<ITrips_ContainersRepository, Trips_ContainersRepository>();
            services.AddScoped<ILoginRepository, LoginRepository>();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("Policy");
            app.UseMvc();
        }
    }
}
