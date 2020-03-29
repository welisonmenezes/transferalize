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
        public string Display { get; set; } = "block";

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<object>("RunTSChart", TSChartContainer, ChartOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            ChartOpts = new TSChartOptions
            {
                Display = Display
            };
        }

    }
}
