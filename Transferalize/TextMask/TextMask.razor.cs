using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{
    public class TextMaskBase : ComponentBase
    {
        public ElementReference TextMaskContainer;

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        public TextMaskOptions TMskOpts { get; set; }

        [Parameter]
        public string Pattern { get; set; }

        [Parameter]
        public bool Reverse { get; set; } = false;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<string>("RunTextMask", TextMaskContainer, TMskOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            TMskOpts = new TextMaskOptions
            {
                Pattern = Pattern,
                Reverse = Reverse
            };
        }

    }
}
