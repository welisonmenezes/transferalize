using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Transferalize
{

    public class TSChartBase : ComponentBase
    {
        public ElementReference TSChartContainer;

        public TSChartOptions ChartOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public string ConfigMethodName { get; set; } = null;

        [Parameter]
        public string Id { get; set; } = Guid.NewGuid().ToString("n").Substring(0, 8);

        [Parameter]
        public string Type { get; set; } = "line";

        [Parameter]
        public int Height { get; set; } = 300;

        [Parameter]
        public List<object> Data { get; set; } = null;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                object config = await JSInterop.InvokeAsync<object>(ConfigMethodName);
                SetOptionsByParameters(config);
                await JSInterop.InvokeAsync<object>("RunTSChart", TSChartContainer, ChartOpts);
            }
        }

        private void SetOptionsByParameters(object config)
        {
            ChartOpts = new TSChartOptions
            {
                ConfigMethodName = ConfigMethodName,
                Configurations = config,
                Type = Type,
                Height = Height,
                Data = Data,
                Id = Id
            };
        }

        public async Task UpdateChart()
        {
            object config = await JSInterop.InvokeAsync<object>(ConfigMethodName);
            SetOptionsByParameters(config);
            await JSInterop.InvokeAsync<object>("RunTSUpdateChart", ChartOpts);
        }
 
    }
}
