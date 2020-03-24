using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Transferalize
{
    public class DatepickerBase : ComponentBase
    {
        public ElementReference DatepickerContainer;

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        [Parameter]
        public Dictionary<string, string> Options { get; set; }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                _ = await JSInterop.InvokeAsync<string>("RunPickdate", DatepickerContainer, Options);
            }
        }
    }
}
