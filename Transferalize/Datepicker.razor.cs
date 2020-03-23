using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize.Components
{
    public class DatepickerBase : ComponentBase
    {
        public ElementReference DatepickerContainer;

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSInterop.InvokeAsync<string>("console.log", DatepickerContainer);
                await JSInterop.InvokeAsync<string>("RunPickdate", DatepickerContainer);
            }
        }
    }
}
