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

        //public bool HasChange { get; set; } = true;

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

                //HasChange = false;

                //await JSInterop.InvokeAsync<object>("console.log", "test");
                //StateHasChanged();
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
            //HasChange = true;
            //StateHasChanged();
            object config = await JSInterop.InvokeAsync<object>(ConfigMethodName);
            SetOptionsByParameters(config);
            await JSInterop.InvokeAsync<object>("RunTSUpdateChart", ChartOpts);
        }
 
    }
}
