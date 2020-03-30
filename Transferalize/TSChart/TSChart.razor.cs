using Microsoft.AspNetCore.Components;

using Microsoft.JSInterop;
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
        public string Type { get; set; } = "line";

        [Parameter]
        public int Height { get; set; } = 300;


        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                object config = await JSInterop.InvokeAsync<object>(ConfigMethodName);

                SetOptionsByParameters(config);
                await JSInterop.InvokeAsync<object>("RunTSChart", TSChartContainer, ChartOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters(object config)
        {
            ChartOpts = new TSChartOptions
            {
                ConfigMethodName = ConfigMethodName,
                Configurations = config,
                Type = Type,
                Height = Height
            };
        }

    }
}
