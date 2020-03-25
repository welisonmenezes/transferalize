using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{
    public class TSTextMaskBase : ComponentBase
    {
        public ElementReference TSTextMaskContainer;

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        public TSTextMaskOptions TMskOpts { get; set; }

        [Parameter]
        public string Pattern { get; set; }

        [Parameter]
        public bool Reverse { get; set; } = false;

        [Parameter]
        public bool Clear { get; set; } = false;

        [Parameter]
        public string Type { get; set; } = "Default";

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<string>("RunTSTextMask", TSTextMaskContainer, TMskOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            TMskOpts = new TSTextMaskOptions
            {
                Pattern = Pattern,
                Reverse = Reverse,
                Clear = Clear,
                Type = Type
            };
        }

    }
}
