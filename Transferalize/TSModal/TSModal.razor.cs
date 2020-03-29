using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{

    public class TSModalBase : ComponentBase
    {

        public ElementReference TSModalContainer;

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        public TSModalOptions ModalOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public string Id { get; set; } = "";

        [Parameter]
        public string Type { get; set; } = "";

        [Parameter]
        public bool PreventScrolling { get; set; } = true;

        [Parameter]
        public double Opacity { get; set; } = 0.5;

        [Parameter]
        public string StartingTop { get; set; } = "5%";

        [Parameter]
        public string EndingTop { get; set; } = "10%";

        [Parameter]
        public bool OpenOnLoad { get; set; } = false;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<object>("RunTSModal", TSModalContainer, ModalOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            ModalOpts = new TSModalOptions
            {
                Id = Id,
                Type = Type,
                PreventScrolling = PreventScrolling,
                Opacity = Opacity,
                StartingTop = StartingTop,
                EndingTop = EndingTop,
                OpenOnLoad = OpenOnLoad
            };
        }

    }
}
