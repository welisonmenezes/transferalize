using Microsoft.AspNetCore.Components;

using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{
    public class TSTabsBase : ComponentBase
    {
        public ElementReference TSTabsContainer;

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                _ = await JSInterop.InvokeAsync<object>("RunTSTabs", TSTabsContainer);
                StateHasChanged();
            }
        }

    }
}
