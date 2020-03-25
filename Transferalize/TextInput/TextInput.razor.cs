using Microsoft.AspNetCore.Components;

using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{
    public class TextInputBase : ComponentBase
    {
        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                _ = await JSInterop.InvokeAsync<object>("RunUpdateInputText");
                StateHasChanged();
            }
        }

    }
}
