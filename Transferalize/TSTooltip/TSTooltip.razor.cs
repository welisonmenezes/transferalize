using Microsoft.AspNetCore.Components;

using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{

    public class TSTooltipBase : ComponentBase
    {

        public ElementReference TSTooltipContainer;

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        public TSTooltipOptions TooltipOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public int EnterDelay { get; set; } = 200;

        [Parameter]
        public int ExitDelay { get; set; } = 0;

        [Parameter]
        public string Display { get; set; } = "block";

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<object>("RunTSTooltip", TSTooltipContainer, TooltipOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            TooltipOpts = new TSTooltipOptions
            {
                EnterDelay = EnterDelay,
                ExitDelay = ExitDelay,
                Display = Display
            };
        }

    }
}
