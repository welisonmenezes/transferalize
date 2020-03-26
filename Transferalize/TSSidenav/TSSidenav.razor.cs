using Microsoft.AspNetCore.Components;

using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{

    public class TSSidenavBase : ComponentBase
    {

        public ElementReference TSSidenavContainer;

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        public TSSidenavOptions SidenavOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public string Edge { get; set; } = "left";

        [Parameter]
        public string Id { get; set; } = "";

        [Parameter]
        public bool IsFixed { get; set; } = false;

        public string FixedClass { get; set; } = "";

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<object>("RunTSSidenav", TSSidenavContainer, SidenavOpts);
                StateHasChanged();
            }
        }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);

            if (IsFixed) {
                FixedClass = "sidenav-fixed";
            }
        }

        private void SetOptionsByParameters()
        {
            SidenavOpts = new TSSidenavOptions
            {
                Edge = Edge
            };
        }

    }
}
