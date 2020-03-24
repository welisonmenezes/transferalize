using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{
    public class DatepickerBase : ComponentBase
    {
        public ElementReference DatepickerContainer;

        public DatepickerOptions DpkrOpts { get; set; }

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
                _ = await JSInterop.InvokeAsync<string>("RunDatepicker", DatepickerContainer, DpkrOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            DpkrOpts = new DatepickerOptions
            {
                Lang = Lang,
                Type = Type,
                Format = Format,
                OpenOn = OpenOn
            };
        }

    }
}
