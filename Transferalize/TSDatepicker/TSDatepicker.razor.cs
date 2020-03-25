using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{
    public class TSDatepickerBase : ComponentBase
    {
        public ElementReference TSDatepickerContainer;

        public TSDatepickerOptions DpkrOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        [Parameter]
        public string Lang { get; set; } = "pt-BR";

        [Parameter]
        public string Type { get; set; }

        [Parameter]
        public string Format { get; set; } = "";

        [Parameter]
        public string OpenOn { get; set; } = "load";

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                await JSInterop.InvokeAsync<string>("RunTSDatepicker", TSDatepickerContainer, DpkrOpts);
                //await JSInterop.InvokeAsync<string>("M.updateTextFields");
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            DpkrOpts = new TSDatepickerOptions
            {
                Lang = Lang,
                Type = Type,
                Format = Format,
                OpenOn = OpenOn
            };
        }

    }
}
